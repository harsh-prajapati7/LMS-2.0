import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Customers", path: "/customers", icon: <FaUsers /> },
  { name: "Loans", path: "/loans", icon: <FaMoneyBillWave /> },
  { name: "Payments", path: "/payments", icon: <FaCalendarCheck /> },
  { name: "Reports", path: "/reports", icon: <FaChartBar /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">💰 LoanMS</h2>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button className="logout-btn">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default Sidebar;