import { useState, useEffect } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { usePools } from "../../hooks/usePools";
import PoolsList from "./components/PoolsList";
import VaultsList from "./components/VaultsList";
import UserPositions from "./components/UserPostitions";
import "./PoolsPage.scss";

const PoolsPage = () => {
  const wallet = useWallet();
  const { pools, userVaults, loading, error } = usePools();
  const [activeTab, setActiveTab] = useState<
    "pools" | "vaults" | "my-positions"
  >("pools");

  return (
    <div className="pools-page">
      <div className="pools-container">
        <div className="pools-header">
          <h1 className="page-title">Liquidity Pools</h1>
          <p className="page-description">Provide liquidity and earn rewards</p>
        </div>

        <div className="pools-tabs">
          <button
            className={`tab-btn ${activeTab === "pools" ? "active" : ""}`}
            onClick={() => setActiveTab("pools")}
          >
            Pools
          </button>
          <button
            className={`tab-btn ${activeTab === "vaults" ? "active" : ""}`}
            onClick={() => setActiveTab("vaults")}
          >
            Vaults
          </button>
          <button
            className={`tab-btn ${
              activeTab === "my-positions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("my-positions")}
            disabled={!wallet.connected}
          >
            My Positions
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading {activeTab}...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">
              Error loading {activeTab}. Please try again.
            </p>
          </div>
        ) : (
          <div className="pools-content">
            {activeTab === "pools" && (
              <PoolsList pools={pools} wallet={wallet} />
            )}
            {activeTab === "vaults" && <VaultsList wallet={wallet} />}
            {activeTab === "my-positions" && wallet.connected && (
              <UserPositions vaults={userVaults} wallet={wallet} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolsPage;
