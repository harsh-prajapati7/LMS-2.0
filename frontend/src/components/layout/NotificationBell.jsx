import { FaBell } from "react-icons/fa";

function NotificationBell() {
  return (
    <div className="notification">
      <FaBell />

      <span className="notification-badge">
        3
      </span>
    </div>
  );
}

export default NotificationBell;