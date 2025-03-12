import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@suiet/wallet-kit";
import "./Header.scss";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo">
          <span className="logo-text">CYPHER</span>
          <span className="logo-accent">DeFi</span>
        </Link>

        <div className={`header__menu ${mobileMenuOpen ? "open" : ""}`}>
          <nav className="header__nav">
            <Link
              to="/swap"
              className={`header__nav-item ${isActive("/swap")}`}
            >
              Swap
            </Link>
            <Link to="/dex" className={`header__nav-item ${isActive("/dex")}`}>
              DEX
            </Link>
            <Link
              to="/pools"
              className={`header__nav-item ${isActive("/pools")}`}
            >
              Pools
            </Link>
          </nav>
        </div>

        <div className="header__actions">
          <ConnectButton className="header__connect-btn" />
          <button
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
