import React from "react";
import { WalletContextState } from "@suiet/wallet-kit";

interface Position {
  id: string;
  poolId: string;
  token0: {
    symbol: string;
    logo: string;
    amount: number;
  };
  token1: {
    symbol: string;
    logo: string;
    amount: number;
  };
  valueUSD: number;
  fees24h: number;
  apr: number;
}

interface UserPositionsProps {
  vaults: any[]; // In a real app, this would have a proper type
  wallet: WalletContextState;
}

const UserPositions: React.FC<UserPositionsProps> = ({ vaults, wallet }) => {
  // Mock positions data
  const positions: Position[] = [
    {
      id: "position-1",
      poolId: "pool-1",
      token0: {
        symbol: "SUI",
        logo: "/assets/tokens/sui.png",
        amount: 1250.5,
      },
      token1: {
        symbol: "USDC",
        logo: "/assets/tokens/usdc.png",
        amount: 12505,
      },
      valueUSD: 25010,
      fees24h: 12.5,
      apr: 18.5,
    },
    {
      id: "position-2",
      poolId: "vault-1",
      token0: {
        symbol: "ETH",
        logo: "/assets/tokens/eth.png",
        amount: 3.2,
      },
      token1: {
        symbol: "USDC",
        logo: "/assets/tokens/usdc.png",
        amount: 6400,
      },
      valueUSD: 12800,
      fees24h: 5.2,
      apr: 14.2,
    },
  ];

  const handleManagePosition = (positionId: string) => {
    // In a real app, navigate to position management page or open a modal
    alert(`Managing position ${positionId}`);
  };

  if (!wallet.connected) {
    return (
      <div className="connect-wallet-message">
        Please connect your wallet to view your positions.
      </div>
    );
  }

  if (!positions.length) {
    return (
      <div className="no-positions-message">
        You don't have any active positions.
      </div>
    );
  }

  return (
    <div className="user-positions">
      <div className="positions-header">
        <h2>Your Active Positions</h2>
      </div>

      <div className="positions-list">
        {positions.map((position) => (
          <div key={position.id} className="position-card card">
            <div className="position-header">
              <div className="position-pair">
                <div className="token-icons">
                  <img
                    src={position.token0.logo}
                    alt={position.token0.symbol}
                    className="token-icon"
                  />
                  <img
                    src={position.token1.logo}
                    alt={position.token1.symbol}
                    className="token-icon second-icon"
                  />
                </div>
                <span className="pair-name">
                  {position.token0.symbol}/{position.token1.symbol}
                </span>
              </div>
              <div className="position-value">
                ${position.valueUSD.toLocaleString()}
              </div>
            </div>

            <div className="position-details">
              <div className="position-tokens">
                <div className="token-amount">
                  <img
                    src={position.token0.logo}
                    alt={position.token0.symbol}
                    className="token-icon small"
                  />
                  <span>
                    {position.token0.amount.toLocaleString()}{" "}
                    {position.token0.symbol}
                  </span>
                </div>
                <div className="token-amount">
                  <img
                    src={position.token1.logo}
                    alt={position.token1.symbol}
                    className="token-icon small"
                  />
                  <span>
                    {position.token1.amount.toLocaleString()}{" "}
                    {position.token1.symbol}
                  </span>
                </div>
              </div>

              <div className="position-stats">
                <div className="position-stat">
                  <span className="stat-label">24h Fees:</span>
                  <span className="stat-value">
                    ${position.fees24h.toFixed(2)}
                  </span>
                </div>
                <div className="position-stat">
                  <span className="stat-label">APR:</span>
                  <span className="stat-value highlight">
                    {position.apr.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="position-actions">
              <button
                className="btn btn--primary btn--sm"
                onClick={() => handleManagePosition(position.id)}
              >
                Manage Position
              </button>
              <button className="btn btn--secondary btn--sm">Withdraw</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPositions;
