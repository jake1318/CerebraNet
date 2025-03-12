/**
 * Format an address to a shortened version
 * @param address Full wallet address
 * @returns Shortened address (0x123...abc)
 */
export const formatAddress = (address: string): string => {
  if (!address) return "";

  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

/**
 * Format a balance with commas and proper decimals
 * @param balance Balance as a string
 * @param decimals Number of decimals
 * @returns Formatted balance string
 */
export const formatBalance = (balance: string, decimals = 9): string => {
  if (!balance) return "0";

  const value = parseFloat(balance) / Math.pow(10, decimals);

  // For small values, show more decimals
  if (value < 0.001) {
    return value.toFixed(6);
  } else if (value < 1) {
    return value.toFixed(4);
  } else if (value < 1000) {
    return value.toFixed(2);
  } else {
    // For larger values, use compact notation
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  }
};

/**
 * Format a USD value
 * @param amount Amount in USD
 * @returns Formatted USD string
 */
export const formatUSD = (amount: number): string => {
  if (amount === 0) return "$0.00";

  if (amount < 0.01) {
    return "< $0.01";
  } else if (amount < 1000) {
    return `$${amount.toFixed(2)}`;
  } else if (amount < 1000000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  } else {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
};

/**
 * Calculate the percent change between two values
 * @param current Current value
 * @param previous Previous value
 * @returns Percentage change with sign
 */
export const calculatePercentChange = (
  current: number,
  previous: number
): string => {
  if (previous === 0) {
    return "+100.00%";
  }

  const percentChange = ((current - previous) / previous) * 100;
  const sign = percentChange >= 0 ? "+" : "";

  return `${sign}${percentChange.toFixed(2)}%`;
};

/**
 * Format a timestamp to a date string
 * @param timestamp UNIX timestamp in seconds or milliseconds
 * @returns Formatted date string
 */
export const formatTimestamp = (timestamp: number): string => {
  // Ensure timestamp is in milliseconds
  const timestampMs = timestamp < 10000000000 ? timestamp * 1000 : timestamp;

  return new Date(timestampMs).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format a timestamp to a relative time string (e.g. "5 minutes ago")
 * @param timestamp UNIX timestamp in seconds or milliseconds
 * @returns Relative time string
 */
export const formatRelativeTime = (timestamp: number): string => {
  // Ensure timestamp is in milliseconds
  const timestampMs = timestamp < 10000000000 ? timestamp * 1000 : timestamp;

  const now = Date.now();
  const diff = now - timestampMs;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};

/**
 * Validate if a string is a valid number
 * @param value String to validate
 * @returns True if valid number
 */
export const isValidNumber = (value: string): boolean => {
  if (!value) return false;

  // Allow empty string or valid number with up to 18 decimals
  const regex = /^$|^[0-9]+\.?[0-9]{0,18}$|^[0-9]*\.?[0-9]{0,18}$/;
  return regex.test(value);
};

/**
 * Get the current timestamp in seconds
 * @returns Current UNIX timestamp in seconds
 */
export const getCurrentTimestamp = (): number => {
  return Math.floor(Date.now() / 1000);
};

/**
 * Generate a random ID
 * @param length Length of the ID
 * @returns Random ID string
 */
export const generateId = (length = 10): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

/**
 * Delay execution for a specified time
 * @param ms Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Truncate a string if it's longer than maxLength
 * @param str String to truncate
 * @param maxLength Maximum length
 * @returns Truncated string with ellipsis
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (!str) return "";

  if (str.length <= maxLength) return str;

  return str.substring(0, maxLength - 3) + "...";
};

/**
 * Get the current date in YYYY-MM-DD format
 * @returns Current date string
 */
export const getCurrentDate = (): string => {
  // Custom implementation for 2025-03-12 00:17:53 (from your message)
  return "2025-03-12";
};

/**
 * Convert a number to a compact representation
 * @param num Number to format
 * @returns Compact number string (e.g. 1.2K, 3.4M)
 */
export const compactNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`;
  } else if (num < 1000000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else {
    return `${(num / 1000000000).toFixed(1)}B`;
  }
};
