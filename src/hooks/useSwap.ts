import { useState, useCallback } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { Transaction } from "@mysten/sui/transactions";
import { computeSwapResult, executeSwap } from "../services/turbos";

interface SwapState {
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  isExactIn: boolean;
  slippage: number;
  loading: boolean;
  error: string | null;
}

export const useSwap = () => {
  const wallet = useWallet();
  const [state, setState] = useState<SwapState>({
    tokenA: "",
    tokenB: "",
    amountA: "",
    amountB: "",
    isExactIn: true,
    slippage: 0.5, // Default slippage 0.5%
    loading: false,
    error: null,
  });

  const updateState = (updates: Partial<SwapState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const calculateSwap = useCallback(async () => {
    if (!state.tokenA || !state.tokenB || (!state.amountA && !state.amountB)) {
      return;
    }

    try {
      updateState({ loading: true, error: null });

      // This is a simplified version - in a real app, you'd need to determine the pools and routes
      // based on the selected tokens
      const swapResult = await computeSwapResult({
        pools: [
          {
            pool: "0x...", // Example pool ID, should be determined based on tokenA and tokenB
            a2b: state.tokenA < state.tokenB, // Example logic, should be based on token ordering in pool
            amountSpecified: state.isExactIn ? state.amountA : state.amountB,
          },
        ],
        address: wallet.account?.address || "",
        amountSpecifiedIsInput: state.isExactIn,
      });

      if (state.isExactIn) {
        // Update amountB based on calculation
        updateState({ amountB: swapResult.amount_b });
      } else {
        // Update amountA based on calculation
        updateState({ amountA: swapResult.amount_a });
      }
    } catch (error) {
      console.error("Error calculating swap:", error);
      updateState({ error: "Failed to calculate swap" });
    } finally {
      updateState({ loading: false });
    }
  }, [
    state.tokenA,
    state.tokenB,
    state.amountA,
    state.amountB,
    state.isExactIn,
    wallet.account,
  ]);

  const executeSwapTransaction = useCallback(async () => {
    if (!wallet.connected) {
      updateState({ error: "Wallet not connected" });
      return;
    }

    try {
      updateState({ loading: true, error: null });

      // Simplified example - in a real app, you'd need proper routing logic
      const swapResult = await computeSwapResult({
        pools: [
          {
            pool: "0x...", // Example pool ID
            a2b: true,
            amountSpecified: state.amountA,
          },
        ],
        address: wallet.account?.address || "",
        amountSpecifiedIsInput: state.isExactIn,
      });

      // Next tick value from swap result
      const nextTickIndex = swapResult.tick_current_index.bits;

      // Create the transaction
      const tx = new Transaction();
      const swapTx = await executeSwap({
        routes: [
          {
            pool: "0x...", // Example pool ID
            a2b: true,
            nextTickIndex,
          },
        ],
        coinTypeA: state.tokenA,
        coinTypeB: state.tokenB,
        address: wallet.account?.address || "",
        amountA: state.amountA,
        amountB: state.amountB,
        amountSpecifiedIsInput: state.isExactIn,
        slippage: state.slippage,
      });

      // Execute the transaction through wallet
      const result = await wallet.signAndExecuteTransaction({
        transaction: swapTx,
      });

      console.log("Swap executed successfully:", result);
      // Reset input amounts after successful swap
      updateState({ amountA: "", amountB: "" });
      return result;
    } catch (error) {
      console.error("Error executing swap:", error);
      updateState({ error: "Failed to execute swap" });
    } finally {
      updateState({ loading: false });
    }
  }, [
    wallet,
    state.tokenA,
    state.tokenB,
    state.amountA,
    state.amountB,
    state.isExactIn,
    state.slippage,
  ]);

  const switchTokens = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      tokenA: prevState.tokenB,
      tokenB: prevState.tokenA,
      amountA: prevState.amountB,
      amountB: prevState.amountA,
    }));
  }, []);

  return {
    state,
    updateState,
    calculateSwap,
    executeSwapTransaction,
    switchTokens,
  };
};
