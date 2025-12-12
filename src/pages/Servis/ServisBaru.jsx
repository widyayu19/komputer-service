import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Servis/ServisBaru.css";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";

const ServisBaru = () => {
  const navigate = useNavigate();

  const [kodeServis, setKodeServis] = useState("");
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [pelangganTerpilih, setPelangganTerpilih] = useState("");
  const [telepon, setTelepon] = useState("");
  const [jenisPerangkat, setJenisPerangkat] = useState("");
  const [serial, setSerial] = useState("");
  const [merek, setMerek] = useState("");
  const [model, setModel] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [kelengkapan, setKelengkapan] = useState("");
  const [keluhan, setKeluhan] = useState("");

  const [pelangganList, setPelangganList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Ambil tanggal hari ini
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTanggalMasuk(today);
  }, []);

  // Ambil pelanggan dari backend
  useEffect(() => {
    fetch("http://localhost:5000/api/pelanggan") // sesuaikan URL backend
      .then(res => res.json())
      .then(data => setPelangganList(data))
      .catch(err => console.error("Error fetching pelanggan:", err));
  }, []);

  // Generate kode servis
  useEffect(() => {
    const servisData = JSON.parse(localStorage.getItem("servis")) || [];
    if (servisData.length === 0) {
      setKodeServis("SRV-2025-001");
    } else {
      const lastKode = servisData[servisData.length - 1].kodeServis;
      const parts = lastKode.split("-");
      const lastNumber = parseInt(parts[2], 10);
      const newNumber = lastNumber + 1;
      const newKode = `SRV-${parts[1]}-${String(newNumber).padStart(3, "0")}`;
      setKodeServis(newKode);
    }
  }, []);

  const handlePilihPelanggan = (p) => {
    setPelangganTerpilih(p.idPelanggan);
    setTelepon(p.noTelp);
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pelangganTerpilih || !jenisPerangkat) {
      alert("Pilih pelanggan dan isi jenis perangkat!");
      return;
    }

    const pelangganNama = pelangganList.find(p => p.idPelanggan === pelangganTerpilih)?.namaPelanggan || "";

    const newServis = {
      kodeServis,
      tanggalMasuk,
      pelangganId: pelangganTerpilih,
      pelangganNama,
      telepon,
      jenisPerangkat,
      serial,
      merek,
      model,
      kondisi,
      kelengkapan,
      keluhan,
      status: "New",
      log: []
    };

    const existingServis = JSON.parse(localStorage.getItem("servis")) || [];
    const updatedServis = [...existingServis, newServis];
    localStorage.setItem("servis", JSON.stringify(updatedServis));

    navigate("/servis");
  };

  const filteredPelanggan = pelangganList.filter(p =>
    p.namaPelanggan.toLowerCase().includes(searchText.toLowerCase()) ||
    p.idPelanggan.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <h2 className="service-page-title">Servis Baru</h2>
      <form className="service-form" onSubmit={handleSubmit}>

        {/* Info Servis */}
        <div className="detail-card info-card">
          <h3>Info Servis</h3>
          <div className="form-row">
            <div className="col">
              <label>Kode Servis</label>
              <input type="text" value={kodeServis} disabled />
            </div>
            <div className="col">
              <label>Tanggal Masuk</label>
              <input type="date" value={tanggalMasuk} disabled />
            </div>
          </div>
          <label>Status</label>
          <input type="text" value="New" disabled className="status-new" />
        </div>

        {/* Info Pelanggan */}
        <div className="detail-card info-card">
          <h3>Informasi Pelanggan</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="text"
              placeholder="Pilih pelanggan..."
              value={pelangganList.find(p => p.idPelanggan === pelangganTerpilih)?.namaPelanggan || ""}
              readOnly
              onClick={() => setModalOpen(true)}
            />
            <button type="button" onClick={() => navigate("/pelanggan-baru")} className="btn-add">
              <FaPlus />
            </button>
          </div>
          <label>Nomor Telepon</label>
          <input type="text" value={telepon} disabled />
        </div>

        {/* Info Barang */}
        <div className="detail-card info-card">
          <h3>Informasi Barang</h3>
          <div className="form-row">
            <div className="col">
              <label>Jenis Perangkat</label>
              <input type="text" value={jenisPerangkat} onChange={e => setJenisPerangkat(e.target.value)} />
            </div>
            <div className="col">
              <label>Nomor Serial / IMEI</label>
              <input type="text" value={serial} onChange={e => setSerial(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="col">
              <label>Merek</label>
              <input type="text" value={merek} onChange={e => setMerek(e.target.value)} />
            </div>
            <div className="col">
              <label>Model</label>
              <input type="text" value={model} onChange={e => setModel(e.target.value)} />
            </div>
          </div>
          <label>Kondisi Fisik</label>
          <textarea value={kondisi} onChange={e => setKondisi(e.target.value)} />
          <label>Kelengkapan Bawaan</label>
          <textarea value={kelengkapan} onChange={e => setKelengkapan(e.target.value)} />
          <label>Keluhan</label>
          <textarea value={keluhan} onChange={e => setKeluhan(e.target.value)} />
        </div>

        {/* Form Action */}
        <div className="form-actions">
          <button type="submit" className="btn-save">Simpan</button>
          <button type="reset" className="btn-cancel">Reset</button>
        </div>
      </form>

      {/* Modal Pelanggan */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Pilih Pelanggan</h4>
              <button onClick={() => setModalOpen(false)} className="btn-close"><FaTimes /></button>
            </div>
            <div className="modal-search">
              <input
                type="text"
                placeholder="Cari pelanggan..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div>
            <table className="modal-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Telepon</th>
                  <th>Alamat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredPelanggan.map(p => (
                  <tr key={p.idPelanggan}>
                    <td>{p.idPelanggan}</td>
                    <td>{p.namaPelanggan}</td>
                    <td>{p.noTelp}</td>
                    <td>{p.alamat}</td>
                    <td>
                      <button type="button" className="btn-select" onClick={() => handlePilihPelanggan(p)}>Pilih</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default ServisBaru;
