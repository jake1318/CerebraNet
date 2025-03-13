import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@suiet/wallet-kit";
import "./HomePage.scss";

const HomePage: React.FC = () => {
  const { connected, account } = useWallet();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">CerebraNet</h1>
            <p className="hero-subtitle">
              The Next-Gen DeFi Platform on Sui Network
            </p>
            <p className="hero-description">
              Trade, earn, and build on the most advanced decentralized exchange
              platform with lightning-fast transactions and minimal fees.
            </p>
            <div className="hero-buttons">
              <Link to="/swap" className="btn btn--primary btn--lg">
                Launch App
              </Link>
              <a href="#learn-more" className="btn btn--secondary btn--lg">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/assets/hero-image.png" alt="CerebraNet Platform" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="learn-more">
        <div className="container">
          <h2 className="section-title">Why Choose CerebraNet?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="icon-lightning"></i>
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-text">
                Experience sub-second transaction finality on Sui's
                high-performance blockchain.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="icon-shield"></i>
              </div>
              <h3 className="feature-title">Secure & Reliable</h3>
              <p className="feature-text">
                Built with advanced security practices to protect your assets at
                all times.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="icon-wallet"></i>
              </div>
              <h3 className="feature-title">Low Fees</h3>
              <p className="feature-text">
                Minimize costs with our optimized smart contracts and Sui's
                efficient gas model.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="icon-chart"></i>
              </div>
              <h3 className="feature-title">Advanced Trading</h3>
              <p className="feature-text">
                Access powerful trading features with our intuitive interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-value">$150M+</h3>
              <p className="stat-label">Total Value Locked</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">100K+</h3>
              <p className="stat-label">Active Users</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">5M+</h3>
              <p className="stat-label">Transactions</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">50+</h3>
              <p className="stat-label">Supported Tokens</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to start trading?</h2>
            <p className="cta-text">
              Jump into the future of DeFi with CerebraNet's advanced trading
              platform.
            </p>
            <Link to="/swap" className="btn btn--primary btn--lg">
              {connected ? "Continue Trading" : "Connect Wallet & Trade"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
