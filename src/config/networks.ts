export enum Network {
  DEVNET = "devnet",
  TESTNET = "testnet",
  MAINNET = "mainnet",
}

export const RPC_URLS = {
  [Network.DEVNET]: "https://fullnode.devnet.sui.io",
  [Network.TESTNET]: "https://fullnode.testnet.sui.io",
  [Network.MAINNET]: "https://fullnode.mainnet.sui.io",
};

export const EXPLORER_URLS = {
  [Network.DEVNET]: "https://explorer.devnet.sui.io",
  [Network.TESTNET]: "https://explorer.testnet.sui.io",
  [Network.MAINNET]: "https://explorer.sui.io",
};

export const DEFAULT_NETWORK = Network.MAINNET;
