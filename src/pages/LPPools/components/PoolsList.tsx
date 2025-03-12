import React, { useState } from "react";
import { WalletContextState } from "@suiet/wallet-kit";
import PoolCard from "./PoolCard";
import AddLiquidityModal from "./AddLiquidityModal";

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

interface PoolsListProps {
  pools: Pool[];
  wallet: WalletContextState;
}

const PoolsList: React.FC<PoolsListProps> = ({ pools, wallet }) => {
  const [sortBy, setSortBy] = useState<string>("tvl");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Mock pools data if none provided
  const mockPools: Pool[] = [
    {
      id: "pool-1",
      token0: {
        symbol: "SUI",
        logo: "/assets/tokens/sui.png",
      },
      token1: {
        symbol: "USDC",
        logo: "/assets/tokens/usdc.png",
      },
      fee: 0.3,
      tvl: 5230000,
      volume24h: 1240000,
      apr: 18.5,
    },
    {
      id: "pool-2",
      token0: {
        symbol: "SUI",
        logo: "/assets/tokens/sui.png",
      },
      token1: {
        symbol: "USDT",
        logo: "/assets/tokens/usdt.png",
      },
      fee: 0.3,
      tvl: 3450000,
      volume24h: 980000,
      apr: 15.2,
    },
    {
      id: "pool-3",
      token0: {
        symbol: "BTC",
        logo: "/assets/tokens/btc.png",
      },
      token1: {
        symbol: "USDC",
        logo: "/assets/tokens/usdc.png",
      },
      fee: 0.05,
      tvl: 8750000,
      volume24h: 4300000,
      apr: 12.8,
    },
    {
      id: "pool-4",
      token0: {
        symbol: "ETH",
        logo: "/assets/tokens/eth.png",
      },
      token1: {
        symbol: "USDC",
        logo: "/assets/tokens/usdc.png",
      },
      fee: 0.3,
      tvl: 6120000,
      volume24h: 3200000,
      apr: 14.3,
    },
  ];

  const displayPools = pools.length > 0 ? pools : mockPools;

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };

  const sortedPools = [...displayPools].sort((a, b) => {
    // @ts-ignore - Dynamic access to properties
    const valueA = a[sortBy];
    // @ts-ignore - Dynamic access to properties
    const valueB = b[sortBy];

    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const filteredPools = sortedPools.filter(
    (pool) =>
      pool.token0.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.token1.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddLiquidity = (pool: Pool) => {
    if (!wallet.connected) {
      alert("Please connect your wallet first");
      return;
    }

    setSelectedPool(pool);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPool(null);
  };

  return (
    <div className="pools-list">
      <div className="pools-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search pools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="sort-container">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="sort-select"
          >
            <option value="tvl">TVL</option>
            <option value="volume24h">Volume 24h</option>
            <option value="apr">APR</option>
          </select>
        </div>
      </div>

      <div className="pools-list-header">
        <span className="header-pair">Pair</span>
        <span className="header-fee">Fee</span>
        <span className="header-tvl">TVL</span>
        <span className="header-volume">Volume 24h</span>
        <span className="header-apr">APR</span>
        <span className="header-action">Action</span>
      </div>

      <div className="pools-list-content">
        {filteredPools.map((pool) => (
          <PoolCard
            key={pool.id}
            pool={pool}
            onAddLiquidity={() => handleAddLiquidity(pool)}
          />
        ))}
      </div>

      {selectedPool && (
        <AddLiquidityModal
          open={isModalOpen}
          onClose={closeModal}
          pool={selectedPool}
          wallet={wallet}
        />
      )}
    </div>
  );
};

export default PoolsList;
