import React from "react";

interface Trade {
  id: string;
  price: string;
  amount: string;
  total: string;
  type: "buy" | "sell";
  timestamp: number;
}

interface RecentTradesProps {
  trades: Trade[];
}

const RecentTrades: React.FC<RecentTradesProps> = ({ trades }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="recent-trades-container card">
      <h3 className="section-title">Recent Trades</h3>
      <div className="trades-table">
        <div className="trades-header">
          <span>Price</span>
          <span>Amount</span>
          <span>Total</span>
          <span>Time</span>
        </div>

        <div className="trades-list">
          {trades.map((trade) => (
            <div className={`trade-row ${trade.type}`} key={trade.id}>
              <span className={trade.type}>{trade.price}</span>
              <span>{trade.amount}</span>
              <span>{trade.total}</span>
              <span>{formatTime(trade.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTrades;
