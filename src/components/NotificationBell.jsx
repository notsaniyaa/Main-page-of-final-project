import { useNotifications } from "../context/NotificationContext";
import { useState } from "react";
import { FaBell } from "react-icons/fa";

function NotificationBell() {
  const { notifications, markAsRead } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRead = (id) => {
    markAsRead(id);
  };

  return (
    <div style={{ position: "relative" }}>
      <FaBell size={24} color="#fff" onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: "pointer" }} />
      {unreadCount > 0 && (
        <span style={styles.badge}>{unreadCount}</span>
      )}

      {showDropdown && (
        <div style={styles.dropdown}>
          {notifications.length === 0 ? (
            <p style={styles.empty}>Нет уведомлений</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                style={{ ...styles.notification, backgroundColor: notif.read ? "#eee" : "#ffdada" }}
                onClick={() => handleRead(notif.id)}
              >
                {notif.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: 30,
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    zIndex: 10,
    minWidth: "250px",
    maxHeight: "300px",
    overflowY: "auto",
  },
  notification: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
  },
  empty: {
    padding: "10px",
    textAlign: "center",
    color: "#888",
  },
};

export default NotificationBell;
