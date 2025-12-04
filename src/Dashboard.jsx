import React from "react";
import { Link, NavLink } from "react-router-dom"; // ✅ Tambahkan ini
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">TechCare</div>
        <nav className="menu">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </NavLink>

          <NavLink
            to="/pelanggan"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fas fa-users"></i> Pelanggan
          </NavLink>

          <NavLink
            to="/servis"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fas fa-tools"></i> Servis
          </NavLink>

          <NavLink
            to="/sparepart"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fas fa-cogs"></i> Sparepart
          </NavLink>

          <NavLink
            to="/datauser"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fas fa-user-cog"></i> Data User
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="topbar">
          <div></div>
          <div className="admin-info">
            <div className="admin-icon">A</div>
            <span>Admin</span>
          </div>
        </header>

        {/* Dashboard Cards */}
        <section className="cards">
          <div className="card blue">
            <h4>Servis Baru (Harian)</h4>
            <p>3</p>
          </div>
          <div className="card orange">
            <h4>Total Pelanggan</h4>
            <p>6</p>
          </div>
          <div className="card red">
            <h4>Total Pendapatan Bulan Ini</h4>
            <p>Rp.0</p>
          </div>
        </section>

        {/* Table Section */}
        <section className="table-section">
          <h3>Pengambilan Hari Ini</h3>
          <table>
            <thead>
              <tr>
                <th>Kode Servis</th>
                <th>Nama Pelanggan</th>
                <th>No. Telepon</th>
                <th>Merek & Model</th>
                <th>Kelengkapan Bawaan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SVC001</td>
                <td>Andi Pratama</td>
                <td>0812-3456-789</td>
                <td>Asus VivoBook 14</td>
                <td>Charger, Tas Laptop</td>
              </tr>
              <tr>
                <td>SVC002</td>
                <td>Budi Santoso</td>
                <td>0857-1122-334</td>
                <td>Lenovo ThinkPad X1</td>
                <td>Charger</td>
              </tr>
              <tr>
                <td>SVC003</td>
                <td>Citra Dewi</td>
                <td>0821-7788-990</td>
                <td>Acer Aspire 5</td>
                <td>Unit Saja</td>
              </tr>
              <tr>
                <td>SVC004</td>
                <td>Dwi Kurniawan</td>
                <td>0813-2233-445</td>
                <td>HP Pavilion 14</td>
                <td>Charger, Mouse</td>
              </tr>
              <tr>
                <td>SVC005</td>
                <td>Farah Nabila</td>
                <td>0852-6677-889</td>
                <td>Dell Inspiron 15</td>
                <td>Charger, HDD Eksternal</td>
              </tr>
              <tr>
                <td>SVC006</td>
                <td>Eka Saputra</td>
                <td>0812-3456-789</td>
                <td>MacBook Air M1</td>
                <td>Charger, Tas Laptop</td>
              </tr>
            </tbody>
          </table>

          <div className="table-footer">
            <span>Showing 1 to 6 of 6 entries</span>
            <div className="pagination">
              <button disabled>Previous</button>
              <button className="active">1</button>
              <button>Next</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
