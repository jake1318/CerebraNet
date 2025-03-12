import { useState, useEffect, useCallback } from "react";
import { useWallet as useSuietWallet } from "@suiet/wallet-kit";
import { formatAddress, formatBalance } from "../utils";
import { getTokenBalances } from "../services/sui";

/**
 * Enhanced wallet hook that extends the Suiet wallet functionality
 * with additional features for the TurboSwap application
 */
export const useWallet = () => {
  const suietWallet = useSuietWallet();
  const [tokenBalances, setTokenBalances] = useState<any>({});
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refresh token balances
  const refreshBalances = useCallback(async () => {
    if (!suietWallet.connected || !suietWallet.account) {
      setTokenBalances({});
      return;
    }

    setIsLoadingBalances(true);
    setError(null);

    try {
      const balances = await getTokenBalances(suietWallet.account.address);
      setTokenBalances(balances);
    } catch (err) {
      console.error("Error fetching token balances:", err);
      setError("Failed to load token balances");
    } finally {
      setIsLoadingBalances(false);
    }
  }, [suietWallet.account, suietWallet.connected]);

  // Load balances when wallet connects or changes
  useEffect(() => {
    if (suietWallet.connected) {
      refreshBalances();
    }
  }, [suietWallet.connected, suietWallet.account, refreshBalances]);

  return {
    ...suietWallet,
    tokenBalances,
    isLoadingBalances,
    refreshBalances,
    error,
    formattedAddress: suietWallet.account
      ? formatAddress(suietWallet.account.address)
      : "",
    nativeBalance: suietWallet.account
      ? formatBalance(suietWallet.account.balance || "0")
      : "0",
  };
};

export default useWallet;
