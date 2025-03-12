import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column">
            <div className="footer-logo">
              <img src="/assets/logo.png" alt="TurboSwap Logo" />
              <span>TurboSwap</span>
            </div>
            <p className="footer-description">
              The fastest decentralized exchange on Sui Network with low fees,
              maximum yields, and sustainable tokenomics.
            </p>
            <div className="social-links">
              <a
                href="https://twitter.com/TurboSwap"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="icon-twitter"></i>
              </a>
              <a
                href="https://discord.gg/turboswap"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <i className="icon-discord"></i>
              </a>
              <a
                href="https://t.me/TurboSwap"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <i className="icon-telegram"></i>
              </a>
              <a
                href="https://github.com/TurboSwap"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="icon-github"></i>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Products</h4>
            <ul className="footer-links">
              <li>
                <Link to="/swap">Swap</Link>
              </li>
              <li>
                <Link to="/pools">Liquidity</Link>
              </li>
              <li>
                <Link to="/farms">Farms</Link>
              </li>
              <li>
                <Link to="/vaults">Vaults</Link>
              </li>
              <li>
                <Link to="/analytics">Analytics</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://docs.turboswap.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TurboSwap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://turboswap.medium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/roadmap">Roadmap</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Community</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://discord.gg/turboswap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/TurboSwap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/TurboSwap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://governance.turboswap.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Governance
                </a>
              </li>
              <li>
                <a
                  href="https://forum.turboswap.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Forum
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} TurboSwap. All rights reserved.
          </div>
          <div className="legal-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/disclaimer">Risk Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
