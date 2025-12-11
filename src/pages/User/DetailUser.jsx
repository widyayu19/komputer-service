import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/User/DetailUser.css";

export default function DetailUser() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    idUser: "",
    namaUser: "",
    email: "",
    password: "",
    role: "",
  });

  // Ambil data user dari backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditPopup = (item) => {
    setIsEdit(true);
    setFormData({
      idUser: item.idUser,
      namaUser: item.namaUser,
      email: item.email,
      password: "",
      role: item.role,
    });
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/user/${formData.idUser}`, formData);
        alert("User berhasil diupdate!");
      }

      setShowPopup(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat update user");
    }
  };

  const deleteData = async (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/user/${id}`);
        alert("User berhasil dihapus!");
        fetchUsers();
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menghapus user");
      }
    }
  };

  const filteredData = users.filter((item) =>
    item.namaUser?.toLowerCase().includes(search.toLowerCase()) ||
    item.idUser?.toString().toLowerCase().includes(search.toLowerCase()) ||
    item.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title user-title">Detail User</h2>

      <div className="user-toolbar">
        <button className="btn-tambah" onClick={() => navigate('/user-baru')}>Tambah</button>
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
              <th>No</th>
              <th>Id User</th>
              <th>Nama User</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{ textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.idUser}>
                <td>{index + 1}</td>
                <td>{item.idUser}</td>
                <td>{item.namaUser}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <div className="action-icons">
                    <button className="btn-edit" onClick={() => openEditPopup(item)}>
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="btn-delete" onClick={() => deleteData(item.idUser)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Edit User</h3>
            <form onSubmit={handleSubmit}>
              <label>ID User</label>
              <input type="text" value={formData.idUser} readOnly />

              <label>Nama</label>
              <input
                type="text"
                value={formData.namaUser}
                onChange={(e) => setFormData({ ...formData, namaUser: e.target.value })}
                required
              />

              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <label>Password (Kosongkan jika tidak ingin diubah)</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <label>Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="">Pilih role</option>
                <option value="admin">Admin</option>
                <option value="teknisi">Teknisi</option>
              </select>

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
