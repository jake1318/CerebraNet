import { Network, TurbosSdk } from "turbos-clmm-sdk";

// Initialize the SDK with preferred network
export const initializeTurbosSdk = (networkType: Network = Network.mainnet) => {
  return new TurbosSdk(networkType);
};

// Singleton instance for app-wide usage
export const turbosSdk = initializeTurbosSdk();

// Get all available pools
export const getAllPools = async (withLocked = false) => {
  try {
    return await turbosSdk.pool.getPools(withLocked);
  } catch (error) {
    console.error("Error fetching pools:", error);
    throw error;
  }
};

// Get specific pool details
export const getPoolDetails = async (poolId: string) => {
  try {
    return await turbosSdk.pool.getPool(poolId);
  } catch (error) {
    console.error(`Error fetching pool ${poolId}:`, error);
    throw error;
  }
};

// Compute swap result
export const computeSwapResult = async (options: any) => {
  try {
    return await turbosSdk.trade.computeSwapResultV2(options);
  } catch (error) {
    console.error("Error computing swap result:", error);
    throw error;
  }
};

// Execute swap
export const executeSwap = async (options: any) => {
  try {
    return await turbosSdk.trade.swap(options);
  } catch (error) {
    console.error("Error executing swap:", error);
    throw error;
  }
};

// Get user's vaults
export const getUserVaults = async (walletAddress: string) => {
  try {
    return await turbosSdk.vault.getMyVaults(walletAddress);
  } catch (error) {
    console.error("Error fetching user vaults:", error);
    throw error;
  }
};
