"use client";

import { useStoreContext } from "../provider";

export const useBalance = () => {
  const { balance } = useStoreContext();
  return balance;
};
