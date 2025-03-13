import {
  JsonRpcProvider,
  testnetConnection,
  mainnetConnection,
  devnetConnection,
} from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Network, TurbosSdk, Contract, Trade, Pool } from "turbos-clmm-sdk";

export enum NetworkType {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  DEVNET = "devnet",
  LOCAL = "local",
}

/**
 * TurbosSdkService provides a wrapper around the Turbos CLMM SDK
 * to interact with the TurboSwap protocol.
 */
class TurbosSdkService {
  private _sdk: TurbosSdk;
  private _network: Network;
  private _provider: JsonRpcProvider;

  /**
   * Initialize the SDK with the specified network
   *
   * @param networkType - The network to connect to (mainnet, testnet, devnet, local)
   */
  constructor(networkType: NetworkType = NetworkType.MAINNET) {
    // Set up the network and connection
    switch (networkType) {
      case NetworkType.MAINNET:
        this._network = Network.mainnet;
        this._provider = new JsonRpcProvider(mainnetConnection);
        break;
      case NetworkType.TESTNET:
        this._network = Network.testnet;
        this._provider = new JsonRpcProvider(testnetConnection);
        break;
      case NetworkType.DEVNET:
        this._network = Network.devnet;
        this._provider = new JsonRpcProvider(devnetConnection);
        break;
      case NetworkType.LOCAL:
        this._network = Network.local;
        this._provider = new JsonRpcProvider({
          fullnode: "http://localhost:9000",
        });
        break;
      default:
        this._network = Network.mainnet;
        this._provider = new JsonRpcProvider(mainnetConnection);
    }

    // Initialize the SDK
    this._sdk = new TurbosSdk(this._network, this._provider);
  }

  /**
   * Returns the current SDK instance
   */
  get sdk(): TurbosSdk {
    return this._sdk;
  }

  /**
   * Returns the current network configuration
   */
  get network(): Network {
    return this._network;
  }

  /**
   * Returns the current provider
   */
  get provider(): JsonRpcProvider {
    return this._provider;
  }

  /**
   * Get the contract configuration
   *
   * @returns Contract configuration details
   */
  async getContractConfig(): Promise<Contract.Config> {
    return await this._sdk.contract.getConfig();
  }

  /**
   * Get the contract fees
   *
   * @returns Array of fee configurations
   */
  async getContractFees(): Promise<Contract.Fee[]> {
    return await this._sdk.contract.getFees();
  }

  /**
   * Compute the result of a swap operation before execution
   *
   * @param params - Swap parameters
   * @returns Computed swap results
   */
  async computeSwapResult(params: {
    pools: Array<{
      pool: string;
      a2b: boolean;
    }>;
    address: string;
    amountSpecified: number | string;
    amountSpecifiedIsInput: boolean;
  }): Promise<Trade.ComputedSwapResult[]> {
    return await this._sdk.trade.computeSwapResult(params);
  }

  /**
   * Execute a swap operation
   *
   * @param params - Swap parameters
   * @returns Transaction builder with the swap transaction
   */
  async executeSwap(params: {
    routes: { pool: string; a2b: boolean; nextTickIndex: number }[];
    coinTypeA: string;
    coinTypeB: string;
    address: string;
    amountA: number | string;
    amountB: number | string;
    amountSpecifiedIsInput: boolean;
    slippage: string;
    txb?: Transaction;
  }) {
    return await this._sdk.trade.swap(params);
  }

  /**
   * Get pools by coin types
   *
   * @param coinTypeA - First coin type
   * @param coinTypeB - Second coin type
   * @returns Array of pools for the specified coins
   */
  async getPoolsByCoinTypes(
    coinTypeA: string,
    coinTypeB: string
  ): Promise<Pool.PoolData[]> {
    return await this._sdk.pool.getPoolsByCoinTypes(coinTypeA, coinTypeB);
  }
}

// Create default instance with mainnet
const turbosSdk = new TurbosSdkService(NetworkType.MAINNET);

export { turbosSdk, TurbosSdkService };
