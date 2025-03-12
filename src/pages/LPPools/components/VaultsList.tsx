import React, { useState, useEffect } from "react";
import { WalletContextState } from "@suiet/wallet-kit";
import VaultCard from "./VaultCard";

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

interface VaultsListProps {
  wallet: WalletContextState;
}

const VaultsList: React.FC<VaultsListProps> = ({ wallet }) => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [sortBy, setSortBy] = useState<string>("tvl");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Mock vaults data
  useEffect(() => {
    const mockVaults: Vault[] = [
      {
        id: "vault-1",
        name: "SUI-USDC Yield Strategy",
        token0: {
          symbol: "SUI",
          logo: "/assets/tokens/sui.png",
        },
        token1: {
          symbol: "USDC",
          logo: "/assets/tokens/usdc.png",
        },
        strategy: "Concentrated Liquidity",
        tvl: 3250000,
        apr: 25.8,
        rewards: ["SUI", "TURBO"],
      },
      {
        id: "vault-2",
        name: "SUI-USDT Yield Strategy",
        token0: {
          symbol: "SUI",
          logo: "/assets/tokens/sui.png",
        },
        token1: {
          symbol: "USDT",
          logo: "/assets/tokens/usdt.png",
        },
        strategy: "Concentrated Liquidity",
        tvl: 2870000,
        apr: 22.5,
        rewards: ["SUI", "TURBO"],
      },
      {
        id: "vault-3",
        name: "BTC-USDC Yield Strategy",
        token0: {
          symbol: "BTC",
          logo: "/assets/tokens/btc.png",
        },
        token1: {
          symbol: "USDC",
          logo: "/assets/tokens/usdc.png",
        },
        strategy: "Concentrated Liquidity",
        tvl: 5420000,
        apr: 19.7,
        rewards: ["BTC", "TURBO"],
      },
      {
        id: "vault-4",
        name: "ETH-USDC Yield Strategy",
        token0: {
          symbol: "ETH",
          logo: "/assets/tokens/eth.png",
        },
        token1: {
          symbol: "USDC",
          logo: "/assets/tokens/usdc.png",
        },
        strategy: "Concentrated Liquidity",
        tvl: 4180000,
        apr: 21.2,
        rewards: ["ETH", "TURBO"],
      },
    ];

    setVaults(mockVaults);
  }, []);

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };

  const sortedVaults = [...vaults].sort((a, b) => {
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

  const filteredVaults = sortedVaults.filter(
    (vault) =>
      vault.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vault.token0.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vault.token1.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeposit = (vaultId: string) => {
    if (!wallet.connected) {
      alert("Please connect your wallet first");
      return;
    }

    // In a real app, open a deposit modal or navigate to deposit page
    alert(`Deposit to vault ${vaultId}`);
  };

  return (
    <div className="vaults-list">
      <div className="vaults-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search vaults..."
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
            <option value="apr">APR</option>
          </select>
        </div>
      </div>

      <div className="vaults-grid">
        {filteredVaults.map((vault) => (
          <VaultCard
            key={vault.id}
            vault={vault}
            onDeposit={() => handleDeposit(vault.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default VaultsList;
