import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Sperpart/DetailSperpart.css";

export default function DetailSperpart() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sperpart, setSperpart] = useState([]);
  const [kategori, setKategori] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    idSperpart: "",
    namaSperpart: "",
    hargaModal: "",
    hargaJual: "",
    stok: "",
    idKategori: "",
  });

  // Load data sperpart
  const fetchSperpart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sperpart");
      setSperpart(res.data);
    } catch (err) {
      console.error("Error fetch sperpart:", err);
    }
  };

  // Load kategori
  const fetchKategori = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/kategoriSperpart");
      setKategori(res.data);
    } catch (err) {
      console.error("Error fetch kategori:", err);
    }
  };

  useEffect(() => {
    fetchSperpart();
    fetchKategori();
  }, []);

  // buka popup edit
  const openEditPopup = (item) => {
    setIsEdit(true);
    setFormData({
      idSperpart: item.idSperpart,
      namaSperpart: item.namaSperpart,
      hargaModal: item.hargaModal ?? item.harga ?? "",
      hargaJual: item.hargaJual ?? item.harga ?? "",
      stok: item.stok,
      idKategori: item.idKategori,
    });
    setShowPopup(true);
  };

  // submit edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/sperpart/${formData.idSperpart}`,
          formData
        );
        alert("Sperpart berhasil diperbarui!");
      }

      setShowPopup(false);
      fetchSperpart();
    } catch (err) {
      console.error(err);
      alert("Gagal update sperpart");
    }
  };

  // delete sperpart
  const deleteData = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/sperpart/${id}`);
        alert("Sperpart berhasil dihapus!");
        fetchSperpart();
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus sperpart");
      }
    }
  };

  const filteredData = sperpart.filter((item) =>
    item.namaSperpart?.toLowerCase().includes(search.toLowerCase()) ||
    item.idSperpart?.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title pelanggan-title">Detail Sperpart</h2>

      <div className="pelanggan-toolbar">
        <button className="btn-tambah" onClick={() => navigate("/sperpart-baru")}>
          Tambah
        </button>

        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Cari sperpart..."
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
              <th>ID Sperpart</th>
              <th>Nama Sperpart</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Kategori</th>
              <th style={{ textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.idSperpart}>
                <td>{index + 1}</td>
                <td>{item.idSperpart}</td>
                <td>{item.namaSperpart}</td>
                <td>
                  Rp {item.hargaJual
                    ? Number(item.hargaJual).toLocaleString("id-ID")
                    : item.harga
                    ? Number(item.harga).toLocaleString("id-ID")
                    : "-"}
                </td>
                <td>{item.stok}</td>
                <td>
                  {
                    kategori.find((k) => k.idKategori === item.idKategori)
                      ?.namaKategori || "-"
                  }
                </td>

                <td>
                  <div className="action-icons">
                    <button className="btn-edit" onClick={() => openEditPopup(item)}>
                      <i className="fas fa-pen"></i>
                    </button>

                    <button className="btn-delete" onClick={() => deleteData(item.idSperpart)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Edit */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Edit Sperpart</h3>

            <form onSubmit={handleSubmit}>
              <label>ID</label>
              <input type="text" value={formData.idSperpart} readOnly />

              <label>Nama Sperpart</label>
              <input
                type="text"
                value={formData.namaSperpart}
                onChange={(e) =>
                  setFormData({ ...formData, namaSperpart: e.target.value })
                }
                required
              />

              <label>Harga Modal</label>
              <input
                type="number"
                value={formData.hargaModal}
                onChange={(e) =>
                  setFormData({ ...formData, hargaModal: e.target.value })
                }
                required
              />

              <label>Harga Jual</label>
              <input
                type="number"
                value={formData.hargaJual}
                onChange={(e) =>
                  setFormData({ ...formData, hargaJual: e.target.value })
                }
                required
              />

              <label>Stok</label>
              <input
                type="number"
                value={formData.stok}
                onChange={(e) =>
                  setFormData({ ...formData, stok: e.target.value })
                }
                required
              />

              <label>Kategori</label>
              <select
                value={formData.idKategori}
                onChange={(e) =>
                  setFormData({ ...formData, idKategori: e.target.value })
                }
                required
              >
                <option value="">-- Pilih Kategori --</option>
                {kategori.map((k) => (
                  <option key={k.idKategori} value={k.idKategori}>
                    {k.namaKategori}
                  </option>
                ))}
              </select>

              <div className="popup-buttons">
                <button type="submit" className="btn-save">Simpan</button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowPopup(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
