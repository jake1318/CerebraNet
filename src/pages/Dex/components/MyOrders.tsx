import React from "react";

interface Order {
  id: string;
  pair: string;
  type: "buy" | "sell";
  price: string;
  amount: string;
  total: string;
  status: "open" | "filled" | "canceled";
  timestamp: number;
}

interface MyOrdersProps {
  orders: Order[];
  onCancelOrder: (id: string) => void;
  isWalletConnected: boolean;
}

const MyOrders: React.FC<MyOrdersProps> = ({
  orders,
  onCancelOrder,
  isWalletConnected,
}) => {
  return (
    <div className="my-orders-container card">
      <h3 className="section-title">My Orders</h3>

      {!isWalletConnected ? (
        <div className="connect-wallet-message">
          Connect your wallet to see your orders
        </div>
      ) : orders.length === 0 ? (
        <div className="no-orders-message">You don't have any open orders</div>
      ) : (
        <div className="orders-table">
          <div className="orders-header">
            <span>Pair</span>
            <span>Type</span>
            <span>Price</span>
            <span>Amount</span>
            <span>Action</span>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-row" key={order.id}>
                <span>{order.pair}</span>
                <span className={order.type}>{order.type}</span>
                <span>{order.price}</span>
                <span>{order.amount}</span>
                <button
                  className="cancel-btn"
                  onClick={() => onCancelOrder(order.id)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
