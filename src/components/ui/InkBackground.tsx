"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
  Fließender Alkohol-Tinten-Hintergrund (WebGL/Three.js).
  Weiche Farbklekse in der Werk-Palette (Rosé · Gold · Petrol · Terracotta)
  driften langsam wie Tinte im Wasser – als edle Atelier-Atmosphäre.
  Läuft nur clientseitig, pausiert außerhalb des Viewports, respektiert
  prefers-reduced-motion und kostet nichts (rein lokal).
*/

const VERT = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform float u_aspect;
  uniform vec3 c1, c2, c3, c4;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= u_aspect;
    float t = u_time * 0.025;
    vec2 p = uv * 2.4;
    // Domain-Warping → weiche, tintige Verläufe
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
    vec2 r = vec2(fbm(p + 2.0 * q + vec2(1.7, 9.2) + t),
                  fbm(p + 2.0 * q + vec2(8.3, 2.8) - t));
    // domain-verzerrtes Feld → vier unabhängige Farbfelder
    vec2 pw = p + 2.5 * r;
    float f1 = fbm(pw + vec2(0.0, 0.0));
    float f2 = fbm(pw + vec2(3.7, 1.2));
    float f3 = fbm(pw + vec2(1.9, 4.3));
    float f4 = fbm(pw + vec2(5.1, 2.8));
    float mx = max(max(f1, f2), max(f3, f4)) + 1e-4;

    // „Nearest-Farbe gewinnt" → distinkte Tinten-Klekse statt Mischbeige
    float e = 8.0;
    float w1 = pow(f1 / mx, e);
    float w2 = pow(f2 / mx, e);
    float w3 = pow(f3 / mx, e);
    float w4 = pow(f4 / mx, e);
    float sw = w1 + w2 + w3 + w4 + 1e-4;
    vec3 col = (c1 * w1 + c2 * w2 + c3 * w3 + c4 * w4) / sw;

    // Klekse konzentriert (mit Papier-Lücken dazwischen), Text bleibt lesbar
    float density = smoothstep(0.45, 0.92, mx);
    float alpha = density * 0.5;
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function InkBackground({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      return; // kein WebGL → Sektion zeigt ruhig ihren Papier-Hintergrund
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const col = (hex: string) => new THREE.Color(hex);
    const uniforms = {
      u_time: { value: 0 },
      u_aspect: { value: 1 },
      c1: { value: col("#c96f8c") }, // Rosé
      c2: { value: col("#cba24e") }, // Gold
      c3: { value: col("#4f8f92") }, // Petrol
      c4: { value: col("#c07a54") }, // Terracotta
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthTest: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.u_aspect.value = w / h;
      renderer.render(scene, camera);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const loop = () => {
      uniforms.u_time.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (reduce) return;
        if (visible && !raf) raf = requestAnimationFrame(loop);
        if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.01 },
    );
    io.observe(host);

    if (reduce) {
      uniforms.u_time.value = 12.0; // ein ruhiges, festes Bild
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden />;
}
