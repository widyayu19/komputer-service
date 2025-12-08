import React, { useState } from "react";
import "../styles/Pelanggan.css";

export default function Pelanggan() {
  const [search, setSearch] = useState("");

  const pelangganData = [
    { id: "CUST001", nama: "Andi Pratama", telp: "081234567890", alamat: "Jl. Raya Ubud No.15, Gianyar, Bali" },
    { id: "CUST002", nama: "Budi Santoso", telp: "081234567891", alamat: "Jl. Raya Seminyak No.10, Kuta, Bali" },
    { id: "CUST003", nama: "Citra Dewi", telp: "081298765432", alamat: "Jl. Pantai Kuta No.21, Badung, Bali" },
    { id: "CUST004", nama: "Dwi Kurniawan", telp: "085612345678", alamat: "Jl. Monkey Forest No.20, Ubud, Bali" },
    { id: "CUST005", nama: "Farah Nabila", telp: "087612341234", alamat: "Jl. Raya Tanah Lot No.3, Tabanan, Bali" },
    { id: "CUST006", nama: "Eka Saputra", telp: "081377889900", alamat: "Jl. Raya Canggu No.5, Badung, Bali" },
  ];

  const filteredData = pelangganData.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.id.toLowerCase().includes(search.toLowerCase()) ||
    item.telp.includes(search)
  );

  return (
    <div className="dashboard-page">

      {/* TITLE */}
      <h2 className="dashboard-title pelanggan-title">Data Pelanggan</h2>

      {/* BUTTON TAMBAH + SEARCH BAR */}
      <div className="pelanggan-toolbar">

        <button className="btn-tambah">Tambah</button>

        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Cari pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Id Pelanggan</th>
              <th>Nama Pelanggan</th>
              <th>No.Telepon</th>
              <th>Alamat</th>
              <th style={{ textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className="id-link">{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.telp}</td>
                <td>{item.alamat}</td>
                <td>
                  <div className="action-icons">
                    <button className="btn-edit"><i className="fas fa-pen"></i></button>
                    <button className="btn-delete"><i className="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
