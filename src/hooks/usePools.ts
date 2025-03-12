import { useState, useEffect } from "react";
import { useWallet } from "@suiet/wallet-kit";

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

interface UserVault {
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

export const usePools = () => {
  const wallet = useWallet();
  const [pools, setPools] = useState<Pool[]>([]);
  const [userVaults, setUserVaults] = useState<UserVault[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPools = async () => {
      setLoading(true);
      setError(null);

      try {
        // In a real app, this would fetch data from an API or blockchain
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

        // Mock data for pools
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
            fee: 0.3 / 100,
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
            fee: 0.3 / 100,
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
            fee: 0.05 / 100,
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
            fee: 0.3 / 100,
            tvl: 6120000,
            volume24h: 3200000,
            apr: 14.3,
          },
          {
            id: "pool-5",
            token0: {
              symbol: "SUI",
              logo: "/assets/tokens/sui.png",
            },
            token1: {
              symbol: "ETH",
              logo: "/assets/tokens/eth.png",
            },
            fee: 0.3 / 100,
            tvl: 4280000,
            volume24h: 1850000,
            apr: 16.7,
          },
        ];

        setPools(mockPools);

        // If wallet is connected, fetch user vaults
        if (wallet.connected) {
          // Mock user vaults data
          const mockUserVaults: UserVault[] = [
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
              poolId: "pool-4",
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

          setUserVaults(mockUserVaults);
        } else {
          setUserVaults([]);
        }
      } catch (e) {
        console.error("Error fetching pools:", e);
        setError("Failed to load pools data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, [wallet.connected]); // Re-fetch when wallet connection changes

  return { pools, userVaults, loading, error };
};
