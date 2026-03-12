"use client";

import { createContext, useContext, useMemo, useState } from "react";

type BalanceStoreContextValue = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

const BalanceStoreContext = createContext<BalanceStoreContextValue | undefined>(
  undefined
);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(0);

  const value = useMemo(
    () => ({
      balance,
      setBalance,
    }),
    [balance]
  );

  return (
    <BalanceStoreContext.Provider value={value}>
      {children}
    </BalanceStoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(BalanceStoreContext);

  if (!context) {
    throw new Error("Store hooks must be used within <StoreProvider />.");
  }

  return context;
}
