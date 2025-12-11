import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Sperpart/SperpartBaru.css";

export default function SperpartBaru() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaSperpart: "",
    hargaModal: "",
    hargaJual: "",
    stok: "",
    idKategori: "",
  });

  const [kategori, setKategori] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Load kategori dari backend
  const fetchKategori = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/kategoriSperpart");
      setKategori(res.data);
    } catch (err) {
      console.error("Gagal load kategori:", err);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  // Submit sperpart baru
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/sperpart", {
        namaSperpart: formData.namaSperpart,
        idKategori: formData.idKategori,
        hargaModal: formData.hargaModal,
        hargaJual: formData.hargaJual,
        stok: formData.stok,
      });

      setShowPopup(true);

      setTimeout(() => navigate("/sperpart"), 1000);
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan sperpart");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="card-form-wrapper">
        
        <h2 className="dashboard-title pelanggan-title pelanggan-page-title">
          Sperpart Baru
        </h2>

        {/* Popup sukses */}
        {showPopup && (
          <div className="popup-success">
            <div className="popup-box">
              <p>Sperpart berhasil ditambahkan!</p>
            </div>
          </div>
        )}

        <form className="pelanggan-form" onSubmit={handleSubmit}>

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

          <label>Kategori Sperpart</label>
          <select
            value={formData.idKategori}
            onChange={(e) =>
              setFormData({ ...formData, idKategori: e.target.value })
            }
            required
          >
            <option value="">-- Pilih Kategori --</option>
            {kategori.map((item) => (
              <option key={item.idKategori} value={item.idKategori}>
                {item.namaKategori}
              </option>
            ))}
          </select>

          <div className="form-actions">
            <button type="submit" className="btn-save">Simpan</button>

            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/sperpart")}
            >
              Batal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
