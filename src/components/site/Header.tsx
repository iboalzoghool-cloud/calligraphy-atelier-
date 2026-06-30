"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";

const NAV = [
  { label: "Galerie", href: "/#galerie" },
  { label: "Atelier", href: "/atelier" },
  { label: "So geht's", href: "/#ablauf" },
  { label: "Anlässe", href: "/#anlaesse" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body-Scroll sperren, wenn das mobile Menü offen ist.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-canvas/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-[4.5rem]">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/gestalten" className="btn btn-primary hidden md:inline-flex">
            Jetzt gestalten
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-[2px] w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-[2px] w-5 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-page border-t border-line bg-canvas pb-6 pt-2">
              <nav className="flex flex-col">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line py-4 text-lg text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/gestalten"
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                Jetzt gestalten
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
