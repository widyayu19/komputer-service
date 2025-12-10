import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Pelanggan/PelangganBaru.css";

function loadPelanggan() {
  try {
    const raw = localStorage.getItem("pelanggan");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function savePelanggan(list) {
  localStorage.setItem("pelanggan", JSON.stringify(list));
}

export default function PelangganBaru() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ id: "", nama: "", telp: "", alamat: "" });
  const [pelanggan, setPelanggan] = useState([]);

  useEffect(() => {
    const stored = loadPelanggan();
    if (stored && stored.length) setPelanggan(stored);
    else {
      const defaults = [
        { id: "CUST001", nama: "Andi Pratama", telp: "081234567890", alamat: "Jl. Raya Ubud No.15, Gianyar, Bali" },
        { id: "CUST002", nama: "Budi Santoso", telp: "081234567891", alamat: "Jl. Raya Seminyak No.10, Kuta, Bali" },
        { id: "CUST003", nama: "Citra Dewi", telp: "081298765432", alamat: "Jl. Pantai Kuta No.21, Badung, Bali" },
        { id: "CUST004", nama: "Dwi Kurniawan", telp: "085612345678", alamat: "Jl. Monkey Forest No.20, Ubud, Bali" },
        { id: "CUST005", nama: "Farah Nabila", telp: "087612341234", alamat: "Jl. Raya Tanah Lot No.3, Tabanan, Bali" },
        { id: "CUST006", nama: "Eka Saputra", telp: "081377889900", alamat: "Jl. Raya Canggu No.5, Badung, Bali" },
      ];
      setPelanggan(defaults);
      savePelanggan(defaults);
    }
  }, []);

  useEffect(() => {
    const last = pelanggan[pelanggan.length - 1]?.id;
    if (!last) setFormData((s) => ({ ...s, id: "CUST001" }));
    else {
      const num = parseInt(last.replace("CUST", "")) + 1;
      setFormData((s) => ({ ...s, id: "CUST" + String(num).padStart(3, "0") }));
    }
  }, [pelanggan]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const exists = pelanggan.some((p) => p.telp === formData.telp);
    if (exists) {
      alert("No telepon sudah terdaftar!");
      return;
    }

    const newList = [...pelanggan, formData];
    setPelanggan(newList);
    savePelanggan(newList);
    navigate("/pelanggan");
  };

  return (
    <div className="dashboard-page">
      {/* Card wrapper */}
      <div className="card-form-wrapper">
        <h2 className="dashboard-title pelanggan-title pelanggan-page-title">Pelanggan Baru</h2>

        <form className="pelanggan-form" onSubmit={handleSubmit}>
          <label>ID Pelanggan</label>
          <input type="text" value={formData.id} readOnly />

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
            <button type="submit" className="btn-save">Simpan</button>
            <button type="button" className="btn-cancel" onClick={() => navigate("/pelanggan")}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
