import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Sperpart/KategoriSperpart.css";

export default function KategoriSperpart() {
  const [kategori, setKategori] = useState([]);
  const [formData, setFormData] = useState({ namaKategori: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Ambil data kategori dari database
  const fetchKategori = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/kategoriSperpart"
      );
      setKategori(res.data);
    } catch (err) {
      console.error("Gagal mengambil kategori:", err);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  // Submit (Tambah / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/kategoriSperpart/${selectedId}`,
          formData
        );
        alert("Kategori sperpart berhasil diperbarui!");
      } else {
        await axios.post(
          "http://localhost:5000/api/kategoriSperpart",
          formData
        );
        alert("Kategori sperpart berhasil ditambahkan!");
      }

      // Reset
      setFormData({ namaKategori: "" });
      setIsEdit(false);
      setSelectedId(null);

      fetchKategori();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    }
  };

  // Edit data → tampilkan di form
  const handleEdit = (item) => {
    setIsEdit(true);
    setSelectedId(item.idKategori);
    setFormData({ namaKategori: item.namaKategori });
  };

  // Hapus kategori
  const deleteKategori = async (id) => {
    if (window.confirm("Yakin ingin menghapus kategori sperpart ini?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/kategoriSperpart/${id}`
        );
        alert("Kategori sperpart berhasil dihapus!");
        fetchKategori();
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus kategori sperpart.");
      }
    }
  };

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title pelanggan-title">Kategori Sperpart</h2>

      {/* Form Tambah & Edit */}
      <div className="card-form-wrapper">
        <form className="kategori-form" onSubmit={handleSubmit}>
          <label>Nama Kategori Sperpart</label>
          <input
            type="text"
            value={formData.namaKategori}
            onChange={(e) =>
              setFormData({ ...formData, namaKategori: e.target.value })
            }
            required
          />

          <button type="submit" className="btn-save">
            {isEdit ? "Update" : "Tambah"}
          </button>

          {isEdit && (
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setIsEdit(false);
                setFormData({ namaKategori: "" });
              }}
            >
              Batal
            </button>
          )}
        </form>
      </div>

      {/* Tabel Kategori */}
      <div className="table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>No</th>
              <th>ID Kategori</th>
              <th>Nama Kategori Sperpart</th>
              <th style={{ textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kategori.length > 0 ? (
              kategori.map((item, index) => (
                <tr key={item.idKategori}>
                  <td>{index + 1}</td>
                  <td>{item.idKategori}</td>
                  <td>{item.namaKategori}</td>
                  <td style={{ textAlign: "center" }}>
                    <div className="action-icons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        <i className="fas fa-pen"></i>
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() =>
                          deleteKategori(item.idKategori)
                        }
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                  Belum ada data kategori sperpart.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
