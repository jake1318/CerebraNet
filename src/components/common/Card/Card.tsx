import React from "react";
import "./Card.scss";

interface CardProps {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  isGradient?: boolean;
  isStretched?: boolean;
  isHoverable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = "",
  isGradient = false,
  isStretched = false,
  isHoverable = false,
  onClick,
}) => {
  const cardClasses = [
    "card",
    isGradient ? "card-gradient" : "",
    isStretched ? "card-stretched" : "",
    isHoverable ? "card-hoverable" : "",
    onClick ? "card-clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle) && (
        <div className="card-header">
          {title &&
            (typeof title === "string" ? (
              <h2 className="card-title">{title}</h2>
            ) : (
              <div className="card-title">{title}</div>
            ))}
          {subtitle && <div className="card-subtitle">{subtitle}</div>}
        </div>
      )}

      <div className="card-body">{children}</div>

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
