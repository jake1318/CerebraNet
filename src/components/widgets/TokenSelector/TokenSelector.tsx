import { useState, useEffect, useRef } from "react";
import { TokenBalance } from "../../types";
import "./TokenSelector.scss";

interface TokenSelectorProps {
  selectedToken?: string;
  onSelectToken: (symbol: string) => void;
  excludedToken?: string;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onSelectToken,
  excludedToken,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock token list - in a real app, this would come from a context or API
  const tokenList: TokenBalance[] = [
    {
      symbol: "SUI",
      name: "Sui",
      balance: "10000000000",
      decimals: 9,
      logo: "/assets/tokens/sui.png",
      usdValue: 12.35,
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: "50000000",
      decimals: 6,
      logo: "/assets/tokens/usdc.png",
      usdValue: 1.0,
    },
    {
      symbol: "USDT",
      name: "Tether",
      balance: "40000000",
      decimals: 6,
      logo: "/assets/tokens/usdt.png",
      usdValue: 1.0,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "500000000000000000",
      decimals: 18,
      logo: "/assets/tokens/eth.png",
      usdValue: 3120.75,
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      balance: "10000000",
      decimals: 8,
      logo: "/assets/tokens/btc.png",
      usdValue: 61452.12,
    },
    {
      symbol: "TURBO",
      name: "TurboSwap",
      balance: "5000000000",
      decimals: 6,
      logo: "/assets/tokens/turbo.png",
      usdValue: 0.85,
    },
  ];

  // Filter tokens based on search and excluded token
  const filteredTokens = tokenList
    .filter((token) => token.symbol !== excludedToken)
    .filter(
      (token) =>
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Find the currently selected token
  const selectedTokenData = tokenList.find((t) => t.symbol === selectedToken);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format balance based on decimals
  const formatTokenBalance = (balance: string, decimals: number) => {
    const value = parseFloat(balance) / Math.pow(10, decimals);
    return value.toFixed(value < 0.01 ? 4 : 2);
  };

  return (
    <div className="token-selector" ref={dropdownRef}>
      <button
        className="token-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {selectedTokenData ? (
          <>
            <img
              src={selectedTokenData.logo}
              alt={selectedTokenData.symbol}
              className="token-logo"
            />
            <span className="token-symbol">{selectedTokenData.symbol}</span>
          </>
        ) : (
          <span>Select a token</span>
        )}
        <i className="arrow-down"></i>
      </button>

      {isOpen && (
        <div className="token-dropdown">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search token name or symbol"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="token-list">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <div
                  key={token.symbol}
                  className={`token-item ${
                    selectedToken === token.symbol ? "selected" : ""
                  }`}
                  onClick={() => {
                    onSelectToken(token.symbol);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <div className="token-info">
                    <img
                      src={token.logo}
                      alt={token.symbol}
                      className="token-logo"
                    />
                    <div className="token-details">
                      <span className="token-symbol">{token.symbol}</span>
                      <span className="token-name">{token.name}</span>
                    </div>
                  </div>
                  <div className="token-balance">
                    <span className="balance-amount">
                      {formatTokenBalance(token.balance, token.decimals)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-tokens">No tokens found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenSelector;
