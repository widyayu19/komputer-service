import React, { useState } from "react";
import "../../styles/User/User.css"; // Pastikan file ini ada!

export default function User() {
  const [search, setSearch] = useState("");

  // ===========================
  //   DATA USER DEFAULT
  // ===========================
  const [users, setUsers] = useState([
    { id: "USR001", nama: "Admin Utama", username: "admin", role: "Admin", phone: "08123456789" },
    { id: "USR002", nama: "Teknisi A", username: "teknisi1", role: "Teknisi", phone: "08129876543" },
  ]);

  // Auto Generate ID User
  const generateUserId = () => {
    const last = users[users.length - 1]?.id;
    if (!last) return "USR001";

    const number = parseInt(last.replace("USR", "")) + 1;
    return "USR" + String(number).padStart(3, "0");
  };

  // ===========================
  //   POPUP STATE
  // ===========================
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    nama: "",
    username: "",
    role: "",
    phone: "",
  });

  const openAddPopup = () => {
    setIsEdit(false);
    setFormData({
      id: generateUserId(),
      nama: "",
      username: "",
      role: "",
      phone: "",
    });
    setShowPopup(true);
  };

  const openEditPopup = (item) => {
    setIsEdit(true);
    setFormData(item);
    setShowPopup(true);
  };

  // ===========================
  //   VALIDASI
  // ===========================
  const handleSubmit = (e) => {
    e.preventDefault();

    const sameUsername = users.some(
      (u) => u.username === formData.username && u.id !== formData.id
    );

    if (sameUsername) {
      alert("Username sudah digunakan!");
      return;
    }

    if (isEdit) {
      setUsers(users.map((u) => (u.id === formData.id ? formData : u)));
    } else {
      setUsers([...users, formData]);
    }

    setShowPopup(false);
  };

  const deleteUser = (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // FILTER DATA
  const filteredData = users.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-page">

      <h2 className="dashboard-title pelanggan-title">Data User</h2>

      <div className="pelanggan-toolbar">
        <button className="btn-tambah" onClick={openAddPopup}>Tambah</button>

        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Cari user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID User</th>
              <th>Nama</th>
              <th>Username</th>
              <th>Role</th>
              <th>No HP</th>
              <th style={{ textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.username}</td>
                <td>{item.role}</td>
                <td>{item.phone}</td>
                <td>
                  <div className="action-icons">
                    <button className="btn-edit" onClick={() => openEditPopup(item)}>
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="btn-delete" onClick={() => deleteUser(item.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====================================
          POPUP USER
      ===================================== */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>{isEdit ? "Edit User" : "Tambah User"}</h3>

            <form onSubmit={handleSubmit}>
              <label>ID User</label>
              <input type="text" value={formData.id} readOnly />

              <label>Nama</label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                required
              />

              <label>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />

              <label>Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="">-- Pilih Role --</option>
                <option value="Admin">Admin</option>
                <option value="Teknisi">Teknisi</option>
              </select>

              <label>No HP</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />

              <div className="popup-buttons">
                <button type="submit" className="btn-save">Simpan</button>
                <button type="button" className="btn-cancel" onClick={() => setShowPopup(false)}>Batal</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
