import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";
import "./Sidebar.scss";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const wallet = useWallet();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Toggle expanded sections
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Check if a path is active or a child path is active
  const isPathActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Main navigation items
  const mainNavItems = [
    {
      path: "/",
      icon: "icon-home",
      label: "Dashboard",
    },
    {
      path: "/swap",
      icon: "icon-swap",
      label: "Swap",
    },
    {
      path: "/pools",
      icon: "icon-liquidity",
      label: "Liquidity Pools",
    },
    {
      path: "/farms",
      icon: "icon-farm",
      label: "Farms",
    },
    {
      path: "/vaults",
      icon: "icon-vault",
      label: "Vaults",
    },
  ];

  // Expandable sections
  const expandableSections = [
    {
      id: "analytics",
      icon: "icon-chart",
      label: "Analytics",
      children: [
        { path: "/analytics/overview", label: "Overview" },
        { path: "/analytics/tokens", label: "Tokens" },
        { path: "/analytics/pools", label: "Pools" },
        { path: "/analytics/transactions", label: "Transactions" },
      ],
    },
    {
      id: "nft",
      icon: "icon-nft",
      label: "NFT",
      children: [
        { path: "/nft/marketplace", label: "Marketplace" },
        { path: "/nft/collection", label: "My Collection" },
      ],
    },
  ];

  // Extra links
  const extraLinks = [
    { path: "/docs", icon: "icon-docs", label: "Documentation" },
    { path: "/governance", icon: "icon-governance", label: "Governance" },
  ];

  return (
    <>
      <div
        className={`backdrop ${isOpen ? "visible" : ""}`}
        onClick={toggleSidebar}
      ></div>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <img src="/assets/logo.png" alt="TurboSwap Logo" />
            <span>TurboSwap</span>
          </div>
          <button className="close-button" onClick={toggleSidebar}>
            <i className="icon-close"></i>
          </button>
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <div className="nav-section">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={isOpen ? toggleSidebar : undefined}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Protocol</div>

              {expandableSections.map((section) => (
                <div key={section.id} className="expandable-section">
                  <div
                    className={`nav-link ${
                      isPathActive(`/${section.id}`) ? "active" : ""
                    }`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <i className={section.icon}></i>
                    <span>{section.label}</span>
                    <i
                      className={`icon-chevron ${
                        expandedSection === section.id ? "rotate" : ""
                      }`}
                    ></i>
                  </div>

                  {expandedSection === section.id && (
                    <div className="submenu">
                      {section.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `submenu-link ${isActive ? "active" : ""}`
                          }
                          onClick={isOpen ? toggleSidebar : undefined}
                        >
                          <span>{child.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Resources</div>

              {extraLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={isOpen ? toggleSidebar : undefined}
                >
                  <i className={link.icon}></i>
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="token-info">
            <div className="token-header">
              <img src="/assets/tokens/turbo.png" alt="TURBO Token" />
              <span>TURBO</span>
            </div>
            <div className="token-price">$0.85</div>
            <div className="token-change positive">+5.2%</div>
          </div>

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
      </aside>
    </>
  );
};

export default Sidebar;
