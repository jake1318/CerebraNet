import { useEffect } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { useSwap } from "../../hooks/useSwap";
import "./SwapPage.scss";

const SwapPage = () => {
  const wallet = useWallet();
  const {
    state,
    updateState,
    calculateSwap,
    executeSwapTransaction,
    switchTokens,
  } = useSwap();

  useEffect(() => {
    // Calculate swap result when input values change
    if (state.tokenA && state.tokenB) {
      if (
        (state.isExactIn && state.amountA) ||
        (!state.isExactIn && state.amountB)
      ) {
        const debounce = setTimeout(() => {
          calculateSwap();
        }, 500); // Debounce to avoid too many API calls

        return () => clearTimeout(debounce);
      }
    }
  }, [
    state.tokenA,
    state.tokenB,
    state.amountA,
    state.amountB,
    state.isExactIn,
    calculateSwap,
  ]);

  const handleAmountChange = (amount: string, isInput: boolean) => {
    if (isInput) {
      updateState({ amountA: amount, isExactIn: true });
    } else {
      updateState({ amountB: amount, isExactIn: false });
    }
  };

  const handleSwap = async () => {
    if (!wallet.connected) {
      alert("Please connect your wallet to swap");
      return;
    }

    await executeSwapTransaction();
  };

  return (
    <div className="swap-page">
      <div className="card swap-container">
        <h2 className="swap-title">Swap</h2>
        <p className="swap-description">Trade tokens in an instant</p>

        <div className="swap-form">
          {/* From token input */}
          <div className="token-input-container">
            <div className="token-input-header">
              <span>From</span>
              {wallet.connected && (
                <span className="token-balance">
                  Balance: {/* Display token balance here */}
                </span>
              )}
            </div>
            <div className="token-input-wrapper">
              <input
                type="number"
                placeholder="0.0"
                value={state.amountA}
                onChange={(e) => handleAmountChange(e.target.value, true)}
                className="token-amount-input"
              />
              <button className="token-select-btn">
                {state.tokenA || "Select Token"}
                <span className="dropdown-icon">▼</span>
              </button>
            </div>
          </div>

          {/* Switch button */}
          <button className="switch-tokens-btn" onClick={switchTokens}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* To token input */}
          <div className="token-input-container">
            <div className="token-input-header">
              <span>To</span>
              {wallet.connected && (
                <span className="token-balance">
                  Balance: {/* Display token balance here */}
                </span>
              )}
            </div>
            <div className="token-input-wrapper">
              <input
                type="number"
                placeholder="0.0"
                value={state.amountB}
                onChange={(e) => handleAmountChange(e.target.value, false)}
                className="token-amount-input"
              />
              <button className="token-select-btn">
                {state.tokenB || "Select Token"}
                <span className="dropdown-icon">▼</span>
              </button>
            </div>
          </div>

          {/* Swap details */}
          {state.amountA && state.amountB && (
            <div className="swap-details">
              <div className="swap-rate">
                <span>Rate</span>
                <span>
                  1 {state.tokenA} = {/* Calculate and display rate */}{" "}
                  {state.tokenB}
                </span>
              </div>
              <div className="swap-slippage">
                <span>Slippage Tolerance</span>
                <span>{state.slippage}%</span>
              </div>
            </div>
          )}

          {/* Error message */}
          {state.error && <div className="error-message">{state.error}</div>}

          {/* Swap button */}
          <button
            className="btn btn--primary btn--lg btn--block swap-btn"
            disabled={
              !wallet.connected ||
              !state.amountA ||
              !state.amountB ||
              state.loading
            }
            onClick={handleSwap}
          >
            {!wallet.connected
              ? "Connect Wallet"
              : state.loading
              ? "Loading..."
              : "Swap"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapPage;
