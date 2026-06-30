"use client";

import {
  createContext,
  useCallback,
  useContext,
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

interface ConfiguratorContextValue {
  state: ConfiguratorState;
  update: (patch: Partial<ConfiguratorState>) => void;
  reset: () => void;
  priceCents: number;
  /** Übergabe-Snapshot für die Bestellung (nur im Speicher, kein Storage). */
  order: OrderSnapshot | null;
  setOrder: (order: OrderSnapshot | null) => void;
}

const ConfiguratorContext = createContext<ConfiguratorContextValue | null>(null);

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfiguratorState>(DEFAULT_STATE);
  const [order, setOrder] = useState<OrderSnapshot | null>(null);

  const update = useCallback((patch: Partial<ConfiguratorState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setState(DEFAULT_STATE), []);

  const value = useMemo<ConfiguratorContextValue>(
    () => ({
      state,
      update,
      reset,
      priceCents: priceForState(state),
      order,
      setOrder,
    }),
    [state, update, reset, order],
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
