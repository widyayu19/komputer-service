import React from "react";
import "../styles/Pelanggan.css";
import { Link } from "react-router-dom";

export default function Pelanggan() {
  const pelangganData = [
    {
      id: "CUST001",
      nama: "Andi Pratama",
      telp: "081234567890",
      alamat: "Jl. Raya Ubud No.15, Gianyar, Bali",
    },
    {
      id: "CUST002",
      nama: "Budi Santoso",
      telp: "081234567891",
      alamat: "Jl. Raya Seminyak No.10, Kuta, Bali",
    },
    {
      id: "CUST003",
      nama: "Citra Dewi",
      telp: "081298765432",
      alamat: "Jl. Pantai Kuta No.21, Badung, Bali",
    },
    {
      id: "CUST004",
      nama: "Dwi Kurniawan",
      telp: "085612345678",
      alamat: "Jl. Monkey Forest No.20, Ubud, Bali",
    },
    {
      id: "CUST005",
      nama: "Farah Nabila",
      telp: "087612341234",
      alamat: "Jl. Raya Tanah Lot No.3, Tabanan, Bali",
    },
    {
      id: "CUST006",
      nama: "Eka Saputra",
      telp: "081377889900",
      alamat: "Jl. Raya Canggu No.5, Badung, Bali",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">TechCare</div>
        <nav className="menu">
          <Link to="/dashboard">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
          <Link to="/pelanggan" className="active">
            <i className="fas fa-users"></i> Pelanggan
          </Link>
          <Link to="#"><i className="fas fa-tools"></i> Servis</Link>
          <Link to="#"><i className="fas fa-cogs"></i> Sparepart</Link>
          <Link to="#"><i className="fas fa-user-cog"></i> Data User</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div></div>
          <div className="admin-info">
            <div className="admin-icon">A</div>
            <span>Admin</span>
          </div>
        </header>

        <section className="content-section">
          <div className="header">
            <h2>Data Pelanggan</h2>
          <button className="btn-tambah">Tambah</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Id Pelanggan</th>
                  <th>Nama Pelanggan</th>
                  <th>No.Telepon</th>
                  <th>Alamat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pelangganData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className="id-link">{item.id}</td>
                    <td>{item.nama}</td>
                    <td>{item.telp}</td>
                    <td>{item.alamat}</td>
                    <td>
                      <div className="action-icons">
                        <button className="btn-edit">
                          <i className="fas fa-pen"></i>
                        </button>
                        <button className="btn-delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
