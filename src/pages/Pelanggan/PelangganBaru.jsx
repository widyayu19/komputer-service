import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Pelanggan/PelangganBaru.css";

export default function PelangganBaru() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nama: "", telp: "", alamat: "" });
  const [showPopup, setShowPopup] = useState(false); // popup sukses

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/pelanggan", {
        namaPelanggan: formData.nama,
        noTelp: formData.telp,
        alamat: formData.alamat,
      });

      // Munculkan popup sukses (tanpa tombol OK)
      setShowPopup(true);

      // Setelah 1 detik langsung pindah ke halaman list pelanggan
      setTimeout(() => {
        navigate("/pelanggan");
      }, 1000);

    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menambahkan pelanggan");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="card-form-wrapper">
        <h2 className="dashboard-title pelanggan-title pelanggan-page-title">
          Pelanggan Baru
        </h2>

        {/* Popup sukses */}
        {showPopup && (
          <div className="popup-success">
            <div className="popup-box">
              <p>Pelanggan berhasil ditambahkan!</p>
            </div>
          </div>
        )}

        <form className="pelanggan-form" onSubmit={handleSubmit}>
          <label>Nama</label>
          <input
            type="text"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            required
          />

          <label>No Telepon</label>
          <input
            type="text"
            value={formData.telp}
            onChange={(e) => setFormData({ ...formData, telp: e.target.value })}
            required
          />

          <label>Alamat</label>
          <textarea
            value={formData.alamat}
            onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
            required
          />

          <div className="form-actions">
            <button type="submit" className="btn-save">
              Simpan
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/pelanggan")}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
