import React, { useState } from "react";
import { isValidNumber } from "../../utils";
import "./InputAmount.scss";

interface InputAmountProps {
  value: string;
  onChange: (value: string) => void;
  onMaxClick?: () => void;
  maxAmount?: string;
  symbol?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const InputAmount: React.FC<InputAmountProps> = ({
  value,
  onChange,
  onMaxClick,
  maxAmount,
  symbol,
  placeholder = "0.0",
  disabled = false,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Validate input is a valid number
    if (newValue === "" || isValidNumber(newValue)) {
      onChange(newValue);
    }
  };

  const handleMaxClick = () => {
    if (onMaxClick && !disabled) {
      onMaxClick();
    }
  };

  return (
    <div
      className={`input-amount ${isFocused ? "focused" : ""} ${
        disabled ? "disabled" : ""
      } ${error ? "has-error" : ""}`}
    >
      <div className="input-wrapper">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {onMaxClick && (
          <button
            type="button"
            className="max-button"
            onClick={handleMaxClick}
            disabled={disabled}
          >
            MAX
          </button>
        )}

        {symbol && <span className="symbol">{symbol}</span>}
      </div>

      {maxAmount && <div className="balance">Balance: {maxAmount}</div>}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputAmount;
