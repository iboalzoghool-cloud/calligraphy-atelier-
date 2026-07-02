"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ConfiguratorState } from "./types";
import { DEFAULT_STATE } from "./options";
import { priceForState } from "./summary";

/** Snapshot, der vom Konfigurator an die Bestellseite übergeben wird. */
export interface OrderSnapshot {
  state: ConfiguratorState;
  mockupDataUrl: string;
  priceCents: number;
}

/*
  Persistenz: sessionStorage. 90 % des Traffics kommt aus TikTok/Instagram-
  In-App-Browsern – die werfen den Tab beim App-Wechsel gern weg. Ohne
  Persistenz ist der Entwurf dann verloren (und /bestellung leer).
  sessionStorage statt localStorage: gilt pro Besuch, kein Alt-Entwurf-Spuk
  Tage später, DSGVO-unkritisch (reine Funktionsdaten).
*/
const STATE_KEY = "cfg-state-v1";
const ORDER_KEY = "cfg-order-v1";

function load<T>(key: string): T | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function save(key: string, value: unknown) {
  try {
    if (value === null) window.sessionStorage.removeItem(key);
    else window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage voll/gesperrt (Private Mode) – dann eben ohne Persistenz.
  }
}

interface ConfiguratorContextValue {
  state: ConfiguratorState;
  update: (patch: Partial<ConfiguratorState>) => void;
  reset: () => void;
  priceCents: number;
  /** Übergabe-Snapshot für die Bestellung (persistiert für Reload/App-Wechsel). */
  order: OrderSnapshot | null;
  setOrder: (order: OrderSnapshot | null) => void;
  /** true, sobald der gespeicherte Zustand geladen wurde (nach Mount). */
  ready: boolean;
}

const ConfiguratorContext = createContext<ConfiguratorContextValue | null>(null);

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfiguratorState>(DEFAULT_STATE);
  const [order, setOrderState] = useState<OrderSnapshot | null>(null);
  const [ready, setReady] = useState(false);

  // Nach dem Mount gespeicherten Zustand übernehmen (SSR-/Hydration-sicher).
  useEffect(() => {
    const savedState = load<ConfiguratorState>(STATE_KEY);
    if (savedState) setState({ ...DEFAULT_STATE, ...savedState });
    const savedOrder = load<OrderSnapshot>(ORDER_KEY);
    if (savedOrder?.mockupDataUrl) setOrderState(savedOrder);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) save(STATE_KEY, state);
  }, [state, ready]);

  const update = useCallback((patch: Partial<ConfiguratorState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
    save(STATE_KEY, null);
  }, []);

  const setOrder = useCallback((next: OrderSnapshot | null) => {
    setOrderState(next);
    save(ORDER_KEY, next);
  }, []);

  const value = useMemo<ConfiguratorContextValue>(
    () => ({
      state,
      update,
      reset,
      priceCents: priceForState(state),
      order,
      setOrder,
      ready,
    }),
    [state, update, reset, order, setOrder, ready],
  );

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
}

export function useConfigurator(): ConfiguratorContextValue {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx) {
    throw new Error("useConfigurator muss innerhalb von ConfiguratorProvider verwendet werden.");
  }
  return ctx;
}
