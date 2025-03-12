import { useState, useEffect } from "react";
import { useWallet } from "@suiet/wallet-kit";
import OrderForm from "./components/OrderForm";
import OrderBook from "./components/OrderBook";
import MyOrders from "./components/MyOrders";
import RecentTrades from "./components/RecentTrades";
import PriceChart from "./components/PriceChart";
import "./DexPage.scss";

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

const DexPage = () => {
  const wallet = useWallet();
  const [selectedPair, setSelectedPair] = useState<string>("SUI/USDC");
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [orderbook, setOrderbook] = useState<{ buys: any[]; sells: any[] }>({
    buys: [],
    sells: [],
  });
  const [priceHistory, setPriceHistory] = useState<
    { time: number; price: number }[]
  >([]);
  const [recentTrades, setRecentTrades] = useState<any[]>([]);

  // Generate mock data
  useEffect(() => {
    // Generate mock orderbook data
    const mockBuys = Array.from({ length: 10 }, (_, i) => ({
      price: (10 - i * 0.05).toFixed(2),
      amount: Math.random() * 10000 + 5000,
      total: Math.random() * 100000 + 50000,
    }));

    const mockSells = Array.from({ length: 10 }, (_, i) => ({
      price: (10 + (i + 1) * 0.05).toFixed(2),
      amount: Math.random() * 10000 + 5000,
      total: Math.random() * 100000 + 50000,
    }));

    setOrderbook({ buys: mockBuys, sells: mockSells });

    // Generate mock price history data
    const now = Date.now();
    const mockPriceHistory = Array.from({ length: 100 }, (_, i) => ({
      time: now - (100 - i) * 3600000,
      price: 10 + Math.sin(i * 0.1) + Math.random() * 0.5,
    }));

    setPriceHistory(mockPriceHistory);

    // Generate mock recent trades
    const mockTrades = Array.from({ length: 10 }, (_, i) => ({
      id: `trade-${i}`,
      price: (10 + (Math.random() * 0.2 - 0.1)).toFixed(2),
      amount: (Math.random() * 1000 + 100).toFixed(2),
      total: (Math.random() * 10000 + 1000).toFixed(2),
      type: Math.random() > 0.5 ? "buy" : "sell",
      timestamp: now - i * 60000,
    }));

    setRecentTrades(mockTrades);

    // Generate mock my orders if wallet is connected
    if (wallet.connected) {
      const mockMyOrders = Array.from({ length: 3 }, (_, i) => ({
        id: `myorder-${i}`,
        pair: "SUI/USDC",
        type: i % 2 === 0 ? "buy" : "sell",
        price: (10 + Math.random() * 0.5).toFixed(2),
        amount: (Math.random() * 1000 + 100).toFixed(2),
        total: (Math.random() * 10000 + 1000).toFixed(2),
        status: "open",
        timestamp: now - i * 3600000,
      }));

      setMyOrders(mockMyOrders);
    }
  }, [wallet.connected]);

  const handleCancelOrder = (orderId: string) => {
    setMyOrders(myOrders.filter((order) => order.id !== orderId));
    alert(`Order ${orderId} canceled`);
  };

  return (
    <div className="dex-page">
      <div className="dex-container">
        <div className="dex-header">
          <div className="pair-selector">
            <select
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className="select-input"
            >
              <option value="SUI/USDC">SUI/USDC</option>
              <option value="SUI/USDT">SUI/USDT</option>
              <option value="BTC/USDC">BTC/USDC</option>
              <option value="ETH/USDC">ETH/USDC</option>
            </select>
          </div>
          <div className="price-stats">
            <div className="price-stat-item">
              <span className="stat-label">Last Price</span>
              <span className="stat-value">
                {orderbook.sells[0]?.price || "0.00"}
              </span>
            </div>
            <div className="price-stat-item">
              <span className="stat-label">24h Change</span>
              <span className="stat-value positive">+5.23%</span>
            </div>
            <div className="price-stat-item">
              <span className="stat-label">24h High</span>
              <span className="stat-value">10.45</span>
            </div>
            <div className="price-stat-item">
              <span className="stat-label">24h Low</span>
              <span className="stat-value">9.78</span>
            </div>
            <div className="price-stat-item">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">1.2M USDC</span>
            </div>
          </div>
        </div>

        <div className="dex-content">
          <div className="dex-chart-section">
            <PriceChart data={priceHistory} />
            <OrderBook orderbook={orderbook} />
          </div>

          <div className="dex-sidebar">
            <OrderForm wallet={wallet} pair={selectedPair} />
            <MyOrders
              orders={myOrders}
              onCancelOrder={handleCancelOrder}
              isWalletConnected={wallet.connected}
            />
          </div>
        </div>

        <RecentTrades trades={recentTrades} />
      </div>
    </div>
  );
};

export default DexPage;
