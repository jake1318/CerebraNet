import React from "react";

interface Vault {
  id: string;
  name: string;
  token0: {
    symbol: string;
    logo: string;
  };
  token1: {
    symbol: string;
    logo: string;
  };
  strategy: string;
  tvl: number;
  apr: number;
  rewards: string[];
}

interface VaultCardProps {
  vault: Vault;
  onDeposit: () => void;
}

const VaultCard: React.FC<VaultCardProps> = ({ vault, onDeposit }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  };

  return (
    <div className="vault-card card">
      <div className="vault-header">
        <div className="vault-name-container">
          <div className="token-icons">
            <img
              src={vault.token0.logo}
              alt={vault.token0.symbol}
              className="token-icon"
            />
            <img
              src={vault.token1.logo}
              alt={vault.token1.symbol}
              className="token-icon second-icon"
            />
          </div>
          <h3 className="vault-name">{vault.name}</h3>
        </div>
        <div className="vault-strategy">
          <span className="strategy-label">Strategy:</span>
          <span className="strategy-value">{vault.strategy}</span>
        </div>
      </div>

      <div className="vault-stats">
        <div className="vault-stat">
          <span className="stat-label">TVL:</span>
          <span className="stat-value">{formatNumber(vault.tvl)}</span>
        </div>
        <div className="vault-stat">
          <span className="stat-label">APR:</span>
          <span className="stat-value highlight">{vault.apr.toFixed(2)}%</span>
        </div>
      </div>

      <div className="vault-rewards">
        <span className="rewards-label">Rewards:</span>
        <div className="rewards-list">
          {vault.rewards.map((reward, index) => (
            <span key={index} className="reward-token">
              {reward}
            </span>
          ))}
        </div>
      </div>

      <button
        className="btn btn--primary vault-deposit-btn"
        onClick={onDeposit}
      >
        Deposit
      </button>
    </div>
  );
};

export default VaultCard;
