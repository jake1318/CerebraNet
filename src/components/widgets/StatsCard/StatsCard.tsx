import React from "react";
import "./StatsCard.scss";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeDirection?: "up" | "down" | "neutral";
  icon?: string;
  iconColor?: string;
  onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeDirection = "neutral",
  icon,
  iconColor,
  onClick,
}) => {
  return (
    <div
      className={`stats-card ${onClick ? "clickable" : ""}`}
      onClick={onClick}
    >
      <div className="stats-header">
        <div className="stats-title">{title}</div>
        {icon && (
          <div className="stats-icon" style={{ color: iconColor }}>
            <i className={icon}></i>
          </div>
        )}
      </div>

      <div className="stats-value">{value}</div>

      {change && (
        <div className={`stats-change ${changeDirection}`}>
          {changeDirection === "up" && <i className="icon-arrow-up"></i>}
          {changeDirection === "down" && <i className="icon-arrow-down"></i>}
          {change}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
