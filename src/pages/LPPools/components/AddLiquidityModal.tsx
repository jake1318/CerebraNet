import React, { useState } from "react";
import { WalletContextState } from "@suiet/wallet-kit";

interface Pool {
  id: string;
  token0: {
    symbol: string;
    logo: string;
  };
  token1: {
    symbol: string;
    logo: string;
  };
  fee: number;
  tvl: number;
  volume24h: number;
  apr: number;
}

interface AddLiquidityModalProps {
  open: boolean;
  onClose: () => void;
  pool: Pool;
  wallet: WalletContextState;
}

const AddLiquidityModal: React.FC<AddLiquidityModalProps> = ({
  open,
  onClose,
  pool,
  wallet,
}) => {
  const [amount0, setAmount0] = useState<string>("");
  const [amount1, setAmount1] = useState<string>("");
  const [slippage, setSlippage] = useState<string>("0.5");
  const [loading, setLoading] = useState<boolean>(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wallet.connected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!amount0 || !amount1) {
      alert("Please enter both amounts");
      return;
    }

    setLoading(true);

    try {
      // In a real app, this would add liquidity through the Turbos SDK
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert(
        `Successfully added liquidity: ${amount0} ${pool.token0.symbol} and ${amount1} ${pool.token1.symbol}`
      );
      onClose();
    } catch (error) {
      alert(`Failed to add liquidity: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add Liquidity</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="pool-info">
            <div className="token-icons">
              <img
                src={pool.token0.logo}
                alt={pool.token0.symbol}
                className="token-icon"
              />
              <img
                src={pool.token1.logo}
                alt={pool.token1.symbol}
                className="token-icon second-icon"
              />
            </div>
            <span className="pair-name">
              {pool.token0.symbol}/{pool.token1.symbol}
            </span>
            <span className="fee-rate">
              Fee: {(pool.fee * 100).toFixed(2)}%
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>{pool.token0.symbol} Amount</label>
              <div className="input-with-max">
                <input
                  type="number"
                  value={amount0}
                  onChange={(e) => setAmount0(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="input"
                />
                <button
                  type="button"
                  className="max-btn"
                  onClick={() => setAmount0("1000")} // In real app, this would be wallet balance
                >
                  MAX
                </button>
              </div>
              <div className="balance-display">
                Balance: 1000 {pool.token0.symbol}
              </div>
            </div>

            <div className="input-group">
              <label>{pool.token1.symbol} Amount</label>
              <div className="input-with-max">
                <input
                  type="number"
                  value={amount1}
                  onChange={(e) => setAmount1(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="input"
                />
                <button
                  type="button"
                  className="max-btn"
                  onClick={() => setAmount1("1000")} // In real app, this would be wallet balance
                >
                  MAX
                </button>
              </div>
              <div className="balance-display">
                Balance: 1000 {pool.token1.symbol}
              </div>
            </div>

            <div className="slippage-selector">
              <label>Slippage Tolerance</label>
              <div className="slippage-options">
                <button
                  type="button"
                  className={`slippage-btn ${
                    slippage === "0.1" ? "active" : ""
                  }`}
                  onClick={() => setSlippage("0.1")}
                >
                  0.1%
                </button>
                <button
                  type="button"
                  className={`slippage-btn ${
                    slippage === "0.5" ? "active" : ""
                  }`}
                  onClick={() => setSlippage("0.5")}
                >
                  0.5%
                </button>
                <button
                  type="button"
                  className={`slippage-btn ${
                    slippage === "1.0" ? "active" : ""
                  }`}
                  onClick={() => setSlippage("1.0")}
                >
                  1.0%
                </button>
                <div className="custom-slippage">
                  <input
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    min="0.01"
                    step="0.1"
                    className="input slippage-input"
                  />
                  <span>%</span>
                </div>
              </div>
            </div>

            <div className="liquidity-summary">
              <div className="summary-item">
                <span>Pool Share:</span>
                <span>0.02%</span>
              </div>
              <div className="summary-item">
                <span>Expected APR:</span>
                <span>{pool.apr.toFixed(2)}%</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--lg btn--block"
              disabled={loading || !amount0 || !amount1}
            >
              {loading ? "Adding Liquidity..." : "Add Liquidity"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLiquidityModal;
