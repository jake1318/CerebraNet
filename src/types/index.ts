// Wallet types
export interface WalletAccount {
  address: string;
  publicKey: string;
  balance?: string;
}

// Token types
export interface Token {
  symbol: string;
  name: string;
  decimals: number;
  balance?: string;
  logoURI?: string;
  address?: string;
  usdValue?: number;
}

export interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  logo: string;
  usdValue: number;
}

// Swap types
export interface SwapRoute {
  fromToken: Token;
  toToken: Token;
  path: string[];
  priceImpact: number;
  expectedOutput: string;
  minimumReceived: string;
}

export interface SwapState {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  slippage: number;
  swapRoute: SwapRoute | null;
  loading: boolean;
  error: string | null;
}

// Pool types
export interface Pool {
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

export interface UserPosition {
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

// Transaction types
export interface TransactionReceipt {
  success: boolean;
  txHash: string;
  blockNumber?: number;
  timestamp?: number;
  gasUsed?: string;
}

// Chart data types
export interface PriceDataPoint {
  time: number;
  price: number;
  volume?: number;
}

export interface ChartData {
  pair: string;
  timeframe: "1H" | "1D" | "1W" | "1M" | "ALL";
  data: PriceDataPoint[];
}

// Notification types
export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  txHash?: string;
  dismissed?: boolean;
}

// Theme types
export type ThemeMode = "light" | "dark";
