import React from "react";
import "./Button.scss";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "text"
  | "gradient"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isFullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  onClick,
  className,
  type = "button",
  ...rest
}) => {
  const buttonClasses = [
    "button",
    `button-${variant}`,
    `button-${size}`,
    isFullWidth ? "full-width" : "",
    isLoading ? "loading" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      {...rest}
    >
      {isLoading && (
        <span className="spinner">
          <svg viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
          </svg>
        </span>
      )}

      {!isLoading && leftIcon && (
        <span className="button-icon left-icon">{leftIcon}</span>
      )}

      <span className="button-text">{children}</span>

      {!isLoading && rightIcon && (
        <span className="button-icon right-icon">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
