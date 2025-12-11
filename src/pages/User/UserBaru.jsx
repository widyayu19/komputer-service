import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/User/UserBaru.css";

export default function UserBaru() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaUser: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPopup, setShowPopup] = useState(false); // popup sukses

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST ke backend
      await axios.post("http://localhost:5000/api/user", formData);

      // Munculkan popup sukses
      setShowPopup(true);

      // Setelah 1 detik redirect ke halaman list user
      setTimeout(() => {
        navigate("/user"); // ke DetailUser
      }, 1000);
    } catch (err) {
      console.error(err);
      // bisa juga tampilkan popup error nanti
      alert("Terjadi kesalahan saat menambahkan user");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="card-form-wrapper">
        <h2 className="dashboard-title user-title user-page-title">
          User Baru
        </h2>

        {/* Popup sukses */}
        {showPopup && (
          <div className="popup-success">
            <div className="popup-box">
              <p>User berhasil ditambahkan!</p>
            </div>
          </div>
        )}

        <form className="user-form" onSubmit={handleSubmit}>
          <label>Nama</label>
          <input
            type="text"
            value={formData.namaUser}
            onChange={(e) =>
              setFormData({ ...formData, namaUser: e.target.value })
            }
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <label>Role</label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            required
          >
            <option value="">Pilih role</option>
            <option value="admin">Admin</option>
            <option value="teknisi">Teknisi</option>
          </select>

          <div className="form-actions">
            <button type="submit" className="btn-save">
              Simpan
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/user")}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
