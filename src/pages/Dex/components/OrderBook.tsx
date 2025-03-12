import React from "react";

interface OrderBookProps {
  orderbook: {
    buys: Array<{
      price: string;
      amount: number;
      total: number;
    }>;
    sells: Array<{
      price: string;
      amount: number;
      total: number;
    }>;
  };
}

const OrderBook: React.FC<OrderBookProps> = ({ orderbook }) => {
  return (
    <div className="orderbook-section">
      <h3 className="section-title">Orderbook</h3>
      <div className="orderbook-headers">
        <span>Price</span>
        <span>Amount</span>
        <span>Total</span>
      </div>

      <div className="orderbook-sells">
        {orderbook.sells.map((order, index) => (
          <div className="orderbook-row sell" key={`sell-${index}`}>
            <span className="price sell">{order.price}</span>
            <span className="amount">{order.amount.toFixed(2)}</span>
            <span className="total">{order.total.toFixed(2)}</span>
            <div
              className="depth-visualization sell"
              style={{ width: `${(order.amount / 15000) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>

      <div className="orderbook-spread">
        <span className="spread-label">Spread</span>
        <span className="spread-value">
          {(
            parseFloat(orderbook.sells[0]?.price || "0") -
            parseFloat(orderbook.buys[0]?.price || "0")
          ).toFixed(2)}
          (
          {(
            ((parseFloat(orderbook.sells[0]?.price || "0") -
              parseFloat(orderbook.buys[0]?.price || "0")) /
              parseFloat(orderbook.sells[0]?.price || "1")) *
            100
          ).toFixed(2)}
          %)
        </span>
      </div>

      <div className="orderbook-buys">
        {orderbook.buys.map((order, index) => (
          <div className="orderbook-row buy" key={`buy-${index}`}>
            <span className="price buy">{order.price}</span>
            <span className="amount">{order.amount.toFixed(2)}</span>
            <span className="total">{order.total.toFixed(2)}</span>
            <div
              className="depth-visualization buy"
              style={{ width: `${(order.amount / 15000) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
