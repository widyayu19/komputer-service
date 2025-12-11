import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Pelanggan/DetailPelanggan.css";

export default function DetailPelanggan() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pelanggan, setPelanggan] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // 🔥 perbaikan: sesuaikan dengan field backend
  const [formData, setFormData] = useState({
    idPelanggan: "",
    namaPelanggan: "",
    noTelp: "",
    alamat: "",
  });

  // Ambil data dari backend
  const fetchPelanggan = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pelanggan");
      setPelanggan(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPelanggan();
  }, []);

  const openEditPopup = (item) => {
    setIsEdit(true);

    // 🔥 Perbaikan: sesuaikan field backend
    setFormData({
      idPelanggan: item.idPelanggan,
      namaPelanggan: item.namaPelanggan,
      noTelp: item.noTelp,
      alamat: item.alamat,
    });

    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/pelanggan/${formData.idPelanggan}`,
          formData
        );
        alert("Pelanggan berhasil diupdate!");
      }

      setShowPopup(false);
      fetchPelanggan();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat update pelanggan");
    }
  };

  const deleteData = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/pelanggan/${id}`);
        alert("Pelanggan berhasil dihapus!");
        fetchPelanggan();
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menghapus pelanggan");
      }
    }
  };

  // 🔥 FIX ERROR: sesuaikan filter dengan field backend
  const filteredData = pelanggan.filter((item) =>
    item.namaPelanggan?.toLowerCase().includes(search.toLowerCase()) ||
    item.idPelanggan?.toString().toLowerCase().includes(search.toLowerCase()) ||
    item.noTelp?.includes(search)
  );

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title pelanggan-title">Detail Pelanggan</h2>

      <div className="pelanggan-toolbar">
        <button className="btn-tambah" onClick={() => navigate('/pelanggan-baru')}>Tambah</button>
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
              <tr key={item.idPelanggan}>
                <td>{index + 1}</td>

                {/* 🔥 perbaikan field */}
                <td>{item.idPelanggan}</td>
                <td>{item.namaPelanggan}</td>
                <td>{item.noTelp}</td>
                <td>{item.alamat}</td>

                <td>
                  <div className="action-icons">
                    <button className="btn-edit" onClick={() => openEditPopup(item)}>
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="btn-delete" onClick={() => deleteData(item.idPelanggan)}>
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
            <h3>Edit Pelanggan</h3>
            <form onSubmit={handleSubmit}>
              <label>ID Pelanggan</label>
              <input type="text" value={formData.idPelanggan} readOnly />

              <label>Nama</label>
              <input
                type="text"
                value={formData.namaPelanggan}
                onChange={(e) => setFormData({ ...formData, namaPelanggan: e.target.value })}
                required
              />

              <label>No Telepon</label>
              <input
                type="text"
                value={formData.noTelp}
                onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
                required
              />

              <label>Alamat</label>
              <textarea
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
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
