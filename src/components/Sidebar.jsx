import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaTools,
  FaBoxes,
  FaUserCog,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";

import "../styles/Sidebar.css";

export default function Sidebar() {
  const { pathname } = useLocation();

  // Dropdown state
  const [openPelanggan, setOpenPelanggan] = useState(false);
  const [openServis, setOpenServis] = useState(false);
  const [openSparepart, setOpenSparepart] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-title">
        <span className="tech">Tech</span>
        <span className="care">Care</span>
      </div>

      <nav className="sidebar-menu">

        {/* =========================
            DASHBOARD 
        ========================== */}
        <Link
          to="/dashboard"
          className={`menu-item ${pathname === "/dashboard" ? "active" : ""}`}
        >
          <span className="icon"><FaTachometerAlt /></span>
          <span>Dashboard</span>
        </Link>

        {/* =========================
            PELANGGAN DROPDOWN 
        ========================== */}
        <div
          className="menu-item dropdown"
          onClick={() => setOpenPelanggan(!openPelanggan)}
        >
          <span className="icon"><FaUsers /></span>
          <span>Pelanggan</span>
          <FaChevronDown className={`chevron ${openPelanggan ? "open" : ""}`} />
        </div>

        {openPelanggan && (
          <div className="submenu">
            <Link
              to="/pelanggan-baru"
              className={`submenu-item ${pathname === "/pelanggan-baru" ? "active" : ""}`}
            >
              Pelanggan Baru
            </Link>

            <Link
              to="/pelanggan"
              className={`submenu-item ${pathname === "/pelanggan" ? "active" : ""}`}
            >
              Detail Pelanggan
            </Link>
          </div>
        )}

        {/* =========================
            SERVIS DROPDOWN 
        ========================== */}
        <div
          className="menu-item dropdown"
          onClick={() => setOpenServis(!openServis)}
        >
          <span className="icon"><FaTools /></span>
          <span>Servis</span>
          <FaChevronDown className={`chevron ${openServis ? "open" : ""}`} />
        </div>

        {openServis && (
          <div className="submenu">
            <Link
              to="/servis-baru"
              className={`submenu-item ${pathname === "/servis-baru" ? "active" : ""}`}
            >
              Servis Baru
            </Link>

            <Link
              to="/servis"
              className={`submenu-item ${pathname === "/servis" ? "active" : ""}`}
            >
              Detail Servis
            </Link>
          </div>
        )}

        {/* =========================
            SPAREPART DROPDOWN 
        ========================== */}
        <div
          className="menu-item dropdown"
          onClick={() => setOpenSparepart(!openSparepart)}
        >
          <span className="icon"><FaBoxes /></span>
          <span>Sparepart</span>
          <FaChevronDown className={`chevron ${openSparepart ? "open" : ""}`} />
        </div>

        {openSparepart && (
          <div className="submenu">
            <Link
              to="/kategori-sparepart"
              className={`submenu-item ${pathname === "/kategori-sparepart" ? "active" : ""}`}
            >
              Kategori Sparepart
            </Link>

            <Link
              to="/sparepart-baru"
              className={`submenu-item ${pathname === "/sparepart-baru" ? "active" : ""}`}
            >
              Sparepart Baru
            </Link>

            <Link
              to="/sparepart"
              className={`submenu-item ${pathname === "/sparepart" ? "active" : ""}`}
            >
              Detail Sparepart
            </Link>
          </div>
        )}

        {/* =========================
            USER DROPDOWN 
        ========================== */}
        <div
          className="menu-item dropdown"
          onClick={() => setOpenUser(!openUser)}
        >
          <span className="icon"><FaUserCog /></span>
          <span>Data User</span>
          <FaChevronDown className={`chevron ${openUser ? "open" : ""}`} />
        </div>

        {openUser && (
          <div className="submenu">
            <Link
              to="/user-baru"
              className={`submenu-item ${pathname === "/user-baru" ? "active" : ""}`}
            >
              User Baru
            </Link>

            <Link
              to="/user"
              className={`submenu-item ${pathname === "/user" ? "active" : ""}`}
            >
              List User
            </Link>
          </div>
        )}

      </nav>

      <div className="sidebar-footer"></div>
    </aside>
  );
}
