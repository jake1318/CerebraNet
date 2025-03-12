import React from "react";

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

interface PoolCardProps {
  pool: Pool;
  onAddLiquidity: () => void;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool, onAddLiquidity }) => {
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
    <div className="pool-card">
      <div className="pool-pair">
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
      </div>
      <div className="pool-fee">{(pool.fee * 100).toFixed(2)}%</div>
      <div className="pool-tvl">{formatNumber(pool.tvl)}</div>
      <div className="pool-volume">{formatNumber(pool.volume24h)}</div>
      <div className="pool-apr">{pool.apr.toFixed(2)}%</div>
      <div className="pool-action">
        <button className="btn btn--primary btn--sm" onClick={onAddLiquidity}>
          Add Liquidity
        </button>
      </div>
    </div>
  );
};

export default PoolCard;
