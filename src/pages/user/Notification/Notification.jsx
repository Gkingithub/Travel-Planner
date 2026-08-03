import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../../../service/notificationService";

import "./Notification.css";

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data || []);
    } catch (err) {
      console.error(err);
      setNotifications([]);
    }
  };

  useEffect(() => {
    console.log("Notifications page loaded");
    loadNotifications();
  }, []);

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item.notificationId === id ? { ...item, isRead: true } : item,
        ),
      );

      window.dispatchEvent(new Event("notificationUpdated"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenPayment = (notification) => {
    if (!notification.bookingId) {
      alert("Booking not found.");
      return;
    }

    navigate("/dashboard/payment", {
      state: {
        bookingId: notification.bookingId,
        notificationId: notification.notificationId,
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) => prev.filter((n) => n.notificationId !== id));

      window.dispatchEvent(new Event("notificationUpdated"));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>

      {notifications.length === 0 ? (
        <div className="no-notifications">No notifications available.</div>
      ) : (
        notifications.map((item) => (
          <div
            key={item.notificationId}
            className={`notification-card ${!item.isRead ? "unread" : ""}`}
          >
            <div className="notification-header">
              <button
                className="deletebtn"
                onClick={() => handleDelete(item.notificationId)}
              >
                ✕
              </button>
            </div>

            <div className="notification-message">{item.message}</div>

            <div className="notification-actions">
              {item.message?.toLowerCase().includes("payment") && (
                <button
                  className="pay-now-btn"
                  onClick={() => handleOpenPayment(item)}
                >
                  Pay Now
                </button>
              )}

              {!item.isRead && (
                <button
                  className="mark-read-btn"
                  onClick={() => handleRead(item.notificationId)}
                >
                  Mark as Read
                </button>
              )}
            </div>

            <div className="notification-date">
              {new Date(item.createdDate).toLocaleString()}
            </div>

          
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;
