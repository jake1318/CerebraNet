import { useState, useEffect, useRef } from "react";
import {
  useTokenBalances,
  formatTokenBalance,
} from "../../../services/TokenService";
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
  const { tokenBalances, isLoading } = useTokenBalances();

  // Filter tokens based on search and excluded token
  const filteredTokens = tokenBalances
    .filter((token) => token.symbol !== excludedToken)
    .filter(
      (token) =>
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Find the currently selected token
  const selectedTokenData = tokenBalances.find(
    (t) => t.symbol === selectedToken
  );

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
              onError={(e) => {
                // If image fails to load, replace with default
                (e.target as HTMLImageElement).src =
                  "/assets/tokens/default-token.png";
              }}
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
            {isLoading ? (
              <div className="loading-tokens">Loading tokens...</div>
            ) : filteredTokens.length > 0 ? (
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
                      onError={(e) => {
                        // If image fails to load, replace with default
                        (e.target as HTMLImageElement).src =
                          "/assets/tokens/default-token.png";
                      }}
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
