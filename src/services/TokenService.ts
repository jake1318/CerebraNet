import { Network, TurbosSdk } from "turbos-clmm-sdk";
import { SUI_TYPE_ARG } from "@mysten/sui/utils";
import { useWallet } from "@suiet/wallet-kit";
import { useState, useEffect } from "react";

// Initialize SDK for mainnet
export const turbosSdk = new TurbosSdk(Network.mainnet);

// Define token types with proper typing
export interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  iconUrl: string;
  address: string; // coin type address like '0x2::sui::SUI'
}

export interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  logo: string;
  usdValue: number;
  address: string;
}

// Common tokens on Sui
const COMMON_TOKENS: TokenInfo[] = [
  {
    symbol: "SUI",
    name: "Sui",
    decimals: 9,
    iconUrl: "/assets/tokens/sui.png",
    address: SUI_TYPE_ARG, // '0x2::sui::SUI'
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    iconUrl: "/assets/tokens/usdc.png",
    address:
      "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
  },
  {
    symbol: "USDT",
    name: "Tether",
    decimals: 6,
    iconUrl: "/assets/tokens/usdt.png",
    address:
      "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ethereum",
    decimals: 8,
    iconUrl: "/assets/tokens/eth.png",
    address:
      "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    decimals: 8,
    iconUrl: "/assets/tokens/btc.png",
    address:
      "0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN",
  },
  {
    symbol: "TURBO",
    name: "TurboSwap",
    decimals: 9,
    iconUrl: "/assets/tokens/turbo.png",
    address:
      "0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a::turbos::TURBOS",
  },
];

// Get all available pools from Turbos
export const fetchPools = async () => {
  try {
    const pools = await turbosSdk.pool.getPools();
    return pools;
  } catch (error) {
    console.error("Error fetching pools:", error);
    return [];
  }
};

// Extract unique tokens from pools
export const extractTokensFromPools = async () => {
  try {
    const pools = await fetchPools();
    const tokenSet = new Set<string>();
    const tokenInfoMap: Record<string, TokenInfo> = {};

    // Add common tokens first
    COMMON_TOKENS.forEach((token) => {
      tokenSet.add(token.address);
      tokenInfoMap[token.address] = token;
    });

    // Extract tokens from pools
    pools.forEach((pool) => {
      const coinA = pool.coinA;
      const coinB = pool.coinB;

      if (!tokenSet.has(coinA)) {
        tokenSet.add(coinA);
        // Create basic info for unknown tokens
        const symbol = coinA.split("::").pop() || "UNKNOWN";
        tokenInfoMap[coinA] = {
          symbol,
          name: symbol,
          decimals: 9, // Default decimals
          iconUrl: "/assets/tokens/default-token.png",
          address: coinA,
        };
      }

      if (!tokenSet.has(coinB)) {
        tokenSet.add(coinB);
        const symbol = coinB.split("::").pop() || "UNKNOWN";
        tokenInfoMap[coinB] = {
          symbol,
          name: symbol,
          decimals: 9, // Default decimals
          iconUrl: "/assets/tokens/default-token.png",
          address: coinB,
        };
      }
    });

    return Object.values(tokenInfoMap);
  } catch (error) {
    console.error("Error extracting tokens from pools:", error);
    return COMMON_TOKENS;
  }
};

// Hook to get token balances for the current wallet
export const useTokenBalances = () => {
  const wallet = useWallet();
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!wallet.connected || !wallet.account) {
        setTokenBalances([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Get all available tokens
        const tokens = await extractTokensFromPools();
        const balances: TokenBalance[] = [];

        // For each token, fetch the balance
        for (const token of tokens) {
          try {
            let balance = "0";

            // Use Suiet wallet to get the balance
            if (wallet.adapter && wallet.account) {
              // For SUI token
              if (token.address === SUI_TYPE_ARG) {
                const { balance: suiBalance } = await wallet.adapter.getBalance(
                  {
                    owner: wallet.account.address,
                    coinType: SUI_TYPE_ARG,
                  }
                );
                balance = suiBalance || "0";
              } else {
                // For other tokens
                const { balance: tokenBalance } =
                  await wallet.adapter.getBalance({
                    owner: wallet.account.address,
                    coinType: token.address,
                  });
                balance = tokenBalance || "0";
              }
            }

            // Add token with balance to the list
            balances.push({
              symbol: token.symbol,
              name: token.name,
              balance,
              decimals: token.decimals,
              logo: token.iconUrl,
              usdValue: 0, // To be updated with real prices in a production app
              address: token.address,
            });
          } catch (error) {
            console.warn(`Failed to fetch balance for ${token.symbol}:`, error);
          }
        }

        setTokenBalances(balances);
      } catch (error) {
        console.error("Error fetching token balances:", error);
        setError("Failed to load token balances");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
  }, [wallet.connected, wallet.account]);

  return { tokenBalances, isLoading, error };
};

// Format token balance for display
export const formatTokenBalance = (
  balance: string,
  decimals: number
): string => {
  if (!balance || balance === "0") return "0";

  try {
    const value = Number(BigInt(balance) / BigInt(10 ** decimals));
    return value.toFixed(value < 0.01 ? 4 : 2);
  } catch (error) {
    console.error("Error formatting token balance:", error);
    return "0";
  }
};
