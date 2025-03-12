import React, { useState } from "react";
import "./Input.scss";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "standard" | "filled";
  fullWidth?: boolean;
  isSuccess?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftElement,
  rightElement,
  size = "md",
  variant = "standard",
  fullWidth = false,
  isSuccess = false,
  className = "",
  onChange,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const containerClasses = [
    "input-container",
    `input-${variant}`,
    `input-${size}`,
    fullWidth ? "input-full-width" : "",
    isFocused ? "input-focused" : "",
    error ? "input-error" : "",
    isSuccess ? "input-success" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      {label && <label className="input-label">{label}</label>}

      <div className="input-wrapper">
        {leftElement && (
          <div className="input-element left-element">{leftElement}</div>
        )}

        <input
          className="input-field"
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {rightElement && (
          <div className="input-element right-element">{rightElement}</div>
        )}
      </div>

      {(helperText || error) && (
        <div className={`input-message ${error ? "error" : ""}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default Input;
