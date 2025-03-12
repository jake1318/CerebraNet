import React, { useState, useEffect } from "react";
import Notification from "../Notification";
import { Notification as NotificationType } from "../../types";
import "./NotificationSystem.scss";

interface NotificationSystemProps {
  maxNotifications?: number;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  maxNotifications = 5,
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // Custom event listener for adding notifications
  useEffect(() => {
    const addNotification = (event: CustomEvent) => {
      const notification: NotificationType = event.detail;

      setNotifications((currentNotifications) => {
        // Add new notification at the beginning and limit to maxNotifications
        const updatedNotifications = [
          notification,
          ...currentNotifications.filter((n) => !n.dismissed),
        ].slice(0, maxNotifications);

        return updatedNotifications;
      });
    };

    // Add event listener
    window.addEventListener(
      "addNotification" as any,
      addNotification as EventListener
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "addNotification" as any,
        addNotification as EventListener
      );
    };
  }, [maxNotifications]);

  const removeNotification = (id: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="notification-system">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          txHash={notification.txHash}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationSystem;
