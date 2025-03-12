import React, { useState, useEffect } from "react";
import { NotificationType } from "../../types";
import "./Notification.scss";

interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
  onClose: (id: string) => void;
  txHash?: string;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  message,
  autoClose = true,
  duration = 5000,
  onClose,
  txHash,
}) => {
  const [progress, setProgress] = useState(100);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!autoClose) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;

      setProgress(newProgress);

      if (newProgress <= 0) {
        clearInterval(intervalId);
        handleClose();
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [autoClose, duration]);

  const handleClose = () => {
    setExiting(true);
    // Wait for exit animation
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 9V13M12 17H12.01M3.07383 17C1.77346 17 0.96502 15.5719 1.62136 14.4262L10.5476 1.42615C11.2336 0.231913 12.7664 0.231913 13.4524 1.42615L22.3786 14.4262C23.035 15.5719 22.2265 17 20.9262 17H3.07383Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        );
      case "info":
      default:
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16V12M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`notification ${type} ${exiting ? "exiting" : ""}`}>
      <div className="notification-content">
        <div className="notification-icon">{getIcon()}</div>
        <div className="notification-text">
          <h4 className="notification-title">{title}</h4>
          <p className="notification-message">{message}</p>
          {txHash && (
            <a
              href={`https://explorer.sui.io/txblock/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tx-link"
            >
              View Transaction
            </a>
          )}
        </div>
        <button className="close-button" onClick={() => handleClose()}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {autoClose && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default Notification;
