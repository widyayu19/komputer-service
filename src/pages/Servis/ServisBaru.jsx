import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Servis/ServisBaru.css";

function loadPelanggan() {
  try {
    const raw = localStorage.getItem("pelanggan");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function loadServis() {
  try {
    const raw = localStorage.getItem("servis");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

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

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTanggalMasuk(today);
  }, []);

  useEffect(() => {
    const stored = loadPelanggan();
    if (stored.length) {
      setPelangganList(stored);
    } else {
      const defaults = [
        { id: "CUST001", nama: "Andi Pratama", telp: "081234567890", alamat: "Jl. Raya Ubud No.15, Gianyar, Bali" },
        { id: "CUST002", nama: "Budi Santoso", telp: "081234567891", alamat: "Jl. Raya Seminyak No.10, Kuta, Bali" },
        { id: "CUST003", nama: "Citra Dewi", telp: "081298765432", alamat: "Jl. Pantai Kuta No.21, Badung, Bali" },
        { id: "CUST004", nama: "Dwi Kurniawan", telp: "085612345678", alamat: "Jl. Monkey Forest No.20, Ubud, Bali" },
        { id: "CUST005", nama: "Farah Nabila", telp: "087612341234", alamat: "Jl. Raya Tanah Lot No.3, Tabanan, Bali" },
        { id: "CUST006", nama: "Eka Saputra", telp: "081377889900", alamat: "Jl. Raya Canggu No.5, Badung, Bali" },
      ];
      setPelangganList(defaults);
      localStorage.setItem("pelanggan", JSON.stringify(defaults));
    }
  }, []);

  useEffect(() => {
    const servisList = loadServis();
    if (servisList.length === 0) {
      setKodeServis("SRV-2025-001");
    } else {
      const lastKode = servisList[servisList.length - 1].kodeServis;
      const parts = lastKode.split("-");
      const lastNumber = parseInt(parts[2], 10);
      const newNumber = lastNumber + 1;
      const newKode = `SRV-${parts[1]}-${String(newNumber).padStart(3, "0")}`;
      setKodeServis(newKode);
    }
  }, []);

  const handlePelangganChange = (e) => {
    const selectedId = e.target.value;
    setPelangganTerpilih(selectedId);

    const selected = pelangganList.find(p => p.id === selectedId);
    setTelepon(selected ? selected.telp : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pelangganTerpilih || !jenisPerangkat) {
      alert("Pilih pelanggan dan isi jenis perangkat!");
      return;
    }

    const pelangganNama = pelangganList.find(p => p.id === pelangganTerpilih)?.nama || "";

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
      status: "Diterima",
      log: []
    };

    const existingServis = loadServis();
    const updatedServis = [...existingServis, newServis];
    localStorage.setItem("servis", JSON.stringify(updatedServis));

    navigate("/servis");
  };

  return (
    <div className="service-card">
      <h2 className="service-page-title">Servis Baru</h2>

      <form className="service-form" onSubmit={handleSubmit}>
        
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

        <label>Nama Pelanggan</label>
        <select value={pelangganTerpilih} onChange={handlePelangganChange}>
          <option value="">-- Pilih Pelanggan --</option>
          {pelangganList.map(p => (
            <option key={p.id} value={p.id}>{p.nama}</option>
          ))}
        </select>

        <label>Nomor Telepon</label>
        <input type="text" value={telepon} disabled />

        <label>Jenis Perangkat</label>
        <input type="text" value={jenisPerangkat} onChange={e => setJenisPerangkat(e.target.value)} />

        <label>Nomor Serial / IMEI</label>
        <input type="text" value={serial} onChange={e => setSerial(e.target.value)} />

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

        {/* Upload foto DIHAPUS */}

        <label>Status</label>
        <input type="text" value="Diterima" disabled />

        <div className="form-actions">
          <button type="submit" className="btn-save">Simpan</button>
          <button type="reset" className="btn-cancel">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default ServisBaru;
