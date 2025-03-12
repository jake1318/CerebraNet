import React, { useState } from "react";
import { WalletContextState } from "@suiet/wallet-kit";

interface OrderFormProps {
  wallet: WalletContextState;
  pair: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ wallet, pair }) => {
  const [activeTab, setActiveTab] = useState<"limit" | "market">("limit");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const calculateTotal = () => {
    if (!price || !amount) return "0.00";
    return (parseFloat(price) * parseFloat(amount)).toFixed(2);
  };

  const handleSubmitOrder = () => {
    if (!wallet.connected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!price || !amount) {
      alert("Please enter both price and amount");
      return;
    }

    // In a real app, this would create and submit the order to the blockchain
    alert(
      `${orderType.toUpperCase()} order submitted: ${amount} SUI at ${price} USDC`
    );

    // Clear form after submission
    setPrice("");
    setAmount("");
  };

  return (
    <div className="order-form-container card">
      <div className="order-form-header">
        <div className="order-form-tabs">
          <button
            className={`tab-btn ${activeTab === "limit" ? "active" : ""}`}
            onClick={() => setActiveTab("limit")}
          >
            Limit
          </button>
          <button
            className={`tab-btn ${activeTab === "market" ? "active" : ""}`}
            onClick={() => setActiveTab("market")}
          >
            Market
          </button>
        </div>
      </div>

      <div className="order-form-body">
        <div className="order-type-selector">
          <button
            className={`order-type-btn buy ${
              orderType === "buy" ? "active" : ""
            }`}
            onClick={() => setOrderType("buy")}
          >
            Buy
          </button>
          <button
            className={`order-type-btn sell ${
              orderType === "sell" ? "active" : ""
            }`}
            onClick={() => setOrderType("sell")}
          >
            Sell
          </button>
        </div>

        <div className="order-form-inputs">
          {activeTab === "limit" && (
            <div className="input-group">
              <label>Price (USDC)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="input"
              />
            </div>
          )}

          <div className="input-group">
            <label>Amount (SUI)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="input"
            />
          </div>

          <div className="slider-container">
            <div className="slider-labels">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="25"
              className="slider"
              onChange={(e) => {
                // In a real app, calculate the amount based on the user's balance
                const percentage = parseInt(e.target.value);
                setAmount(((1000 * percentage) / 100).toFixed(2));
              }}
            />
          </div>

          <div className="input-group">
            <label>Total (USDC)</label>
            <input
              type="text"
              value={calculateTotal()}
              readOnly
              className="input"
            />
          </div>
        </div>

        <button
          className={`order-submit-btn ${orderType}`}
          onClick={handleSubmitOrder}
          disabled={!wallet.connected}
        >
          {wallet.connected
            ? `${orderType === "buy" ? "Buy" : "Sell"} SUI`
            : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
