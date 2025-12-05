import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaTools,
  FaBoxes,
  FaUserCog
} from "react-icons/fa";

import "../styles/Sidebar.css"; // styling dipisah biar lebih rapi

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Pelanggan", path: "/pelanggan", icon: <FaUsers /> },
    { name: "Servis", path: "/servis", icon: <FaTools /> },
    { name: "Sparepart", path: "/sparepart", icon: <FaBoxes /> },
    { name: "Data User", path: "/user", icon: <FaUserCog /> },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-title">
        <span className="tech">Tech</span>
        <span className="care">Care</span>
      </div>

      <nav className="sidebar-menu">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu-item ${pathname === item.path ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer"></div>
    </aside>
  );
}
