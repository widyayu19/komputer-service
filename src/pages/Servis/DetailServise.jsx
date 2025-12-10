// DetailServis.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Servis/DetailServis.css";

function loadServis() {
  try {
    const raw = localStorage.getItem("servis");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

const DetailServis = () => {
  const [servisList, setServisList] = useState([]);
  const [selectedServis, setSelectedServis] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [editInfoMode, setEditInfoMode] = useState(false);
  const [formDiag, setFormDiag] = useState({
    diagnosa: "",
    perbaikan: "",
    sparepart: "",
    waktu: "",
    biaya: "",
  });
  const [formInfo, setFormInfo] = useState({
    pelangganNama: "",
    telepon: "",
    jenisPerangkat: "",
    serial: "",
    merek: "",
    model: "",
    kondisi: "",
    keluhan: "",
    kelengkapan: "",
  });

  useEffect(() => {
    setServisList(loadServis());
  }, []);

  const handleSelectServis = (kode) => {
    const servis = servisList.find((s) => s.kodeServis === kode);
    setSelectedServis(servis);

    setFormDiag({
      diagnosa: servis.diagnosa || "",
      perbaikan: servis.perbaikan || "",
      sparepart: servis.sparepart || "",
      waktu: servis.waktu || "",
      biaya: servis.biaya || "",
    });

    setFormInfo({
      pelangganNama: servis.pelangganNama || "",
      telepon: servis.telepon || "",
      jenisPerangkat: servis.jenisPerangkat || "",
      serial: servis.serial || "",
      merek: servis.merek || "",
      model: servis.model || "",
      kondisi: servis.kondisi || "",
      keluhan: servis.keluhan || "",
      kelengkapan: servis.kelengkapan || "",
    });
  };

  const handleBackToList = () => {
    setSelectedServis(null);
    setEditMode(false);
    setEditInfoMode(false);
  };

  const handleDelete = (kode) => {
    if (window.confirm("Hapus servis ini?")) {
      const updated = servisList.filter((s) => s.kodeServis !== kode);
      localStorage.setItem("servis", JSON.stringify(updated));
      setServisList(updated);
    }
  };

  const filteredList = servisList.filter(
    (s) =>
      s.kodeServis.toLowerCase().includes(search.toLowerCase()) ||
      (s.pelangganNama &&
        s.pelangganNama.toLowerCase().includes(search.toLowerCase())) ||
      (s.jenisPerangkat &&
        s.jenisPerangkat.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSaveDiagnosa = () => {
    const updated = servisList.map((s) =>
      s.kodeServis === selectedServis.kodeServis
        ? { ...s, ...formDiag }
        : s
    );

    localStorage.setItem("servis", JSON.stringify(updated));
    setServisList(updated);

    const newSelected = updated.find(
      (s) => s.kodeServis === selectedServis.kodeServis
    );

    setSelectedServis(newSelected);
    setEditMode(false);
    alert("Diagnosa berhasil diperbarui!");
  };

  const handleSaveInfo = () => {
    const updated = servisList.map((s) =>
      s.kodeServis === selectedServis.kodeServis
        ? { ...s, ...formInfo }
        : s
    );

    localStorage.setItem("servis", JSON.stringify(updated));
    setServisList(updated);

    const newSelected = updated.find(
      (s) => s.kodeServis === selectedServis.kodeServis
    );

    setSelectedServis(newSelected);
    setEditInfoMode(false);
    alert("Informasi berhasil diperbarui!");
  };

  /* ==========================
     LIST SERVIS
  ========================== */
  if (!selectedServis) {
    return (
      <div className="dashboard-page">

        <h2 className="pelanggan-title">Detail Servis</h2>

        <div className="pelanggan-toolbar">
          <button className="btn-tambah" onClick={() => navigate("/servis-baru")}>
            Tambah Servis Baru
          </button>

          <div className="search-box">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Cari Servis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="dashboard-table table-servis">
            <thead>
              <tr>
                <th>Kode Servis</th>
                <th>Pelanggan</th>
                <th>Perangkat</th>
                <th>Status</th>
                <th>Tanggal Masuk</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Tidak ada data servis
                  </td>
                </tr>
              )}

              {filteredList.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.kodeServis}</td>
                  <td>{s.pelangganNama || s.pelangganId}</td>
                  <td>{s.jenisPerangkat}</td>
                  <td>{s.status}</td>
                  <td>{s.tanggalMasuk}</td>

                  <td className="action-icons">
                    <button
                      className="btn-detail"
                      onClick={() => handleSelectServis(s.kodeServis)}
                    >
                      Detail
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(s.kodeServis)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    );
  }

  /* ==========================
     DETAIL SERVIS TERPILIH
  ========================== */
  return (
    <div className="dashboard-page">

      <button className="btn-back" onClick={handleBackToList}>← Kembali</button>

      <div className="detail-header-top">

  <div>
    <h2 className="detail-title">
      Detail Servis — <span>{selectedServis.kodeServis}</span>
    </h2>
  </div>

  <div className="status-edit-box">

    {/* Jika tidak sedang edit status */}
    {!selectedServis.editStatus ? (
      <>
        {/* BADGE STATUS */}
        <span className={`status-badge ${selectedServis.status}`}>
          {selectedServis.status}
        </span>

        {/* ICON EDIT */}
        <i
          className="fas fa-edit edit-status-icon"
          onClick={() =>
            setSelectedServis({
              ...selectedServis,
              editStatus: true,
            })
          }
        ></i>
      </>
    ) : (
      /* DROPDOWN EDIT STATUS */
      <select
        className="status-dropdown"
        value={selectedServis.status}
        onChange={(e) => {
          const updatedList = servisList.map((s) =>
            s.kodeServis === selectedServis.kodeServis
              ? { ...s, status: e.target.value, editStatus: false }
              : s
          );

          // Simpan ke localStorage
          localStorage.setItem("servis", JSON.stringify(updatedList));
          setServisList(updatedList);

          // Update selected
          setSelectedServis(
            updatedList.find(
              (s) => s.kodeServis === selectedServis.kodeServis
            )
          );
        }}
      >
        <option value="Diterima">Diterima</option>
        <option value="Dalam Diagnosa">Dalam Diagnosa</option>
        <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
        <option value="Dalam Pengerjaan">Dalam Pengerjaan</option>
        <option value="Menunggu Sparepart">Menunggu Sparepart</option>
        <option value="Selesai">Selesai</option>
        <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
        <option value="Diambil">Diambil</option>
      </select>
    )}
  </div>
</div>


      <div className="detail-wrapper">

        {/* INFORMASI PELANGGAN & BARANG - MERGED */}
        <div className="detail-card info-card">
          <h3>Informasi Pelanggan & Barang</h3>

          {!editInfoMode ? (
            <div>
              {/* PELANGGAN */}
              <div className="section-label">Pelanggan</div>
              <div className="detail-grid-2">
                <div className="detail-item"><strong>Nama:</strong> {selectedServis.pelangganNama}</div>
                <div className="detail-item"><strong>No Telepon:</strong> {selectedServis.telepon}</div>
              </div>

              {/* BARANG */}
              <div className="section-label">Barang</div>
              <div className="detail-grid-3">
                <div className="detail-item"><strong>Jenis:</strong> {selectedServis.jenisPerangkat}</div>
                <div className="detail-item"><strong>No Seri / IMEI:</strong> {selectedServis.serial}</div>
                <div className="detail-item"><strong>Merek / Model:</strong> {selectedServis.merek} / {selectedServis.model}</div>
              </div>

              <div className="detail-grid-3">
                <div className="detail-item"><strong>Kondisi:</strong> {selectedServis.kondisi}</div>
                <div className="detail-item"><strong>Keluhan:</strong> {selectedServis.keluhan}</div>
                <div className="detail-item"><strong>Kelengkapan:</strong> {selectedServis.kelengkapan}</div>
              </div>

              <button className="btn-edit-info" onClick={() => setEditInfoMode(true)}>
                Edit Informasi
              </button>
            </div>
          ) : (
            <div className="edit-info-form">
              <div className="section-label">Edit Pelanggan</div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Nama Pelanggan</label>
                  <input
                    type="text"
                    value={formInfo.pelangganNama}
                    onChange={(e) => setFormInfo({ ...formInfo, pelangganNama: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>No Telepon</label>
                  <input
                    type="text"
                    value={formInfo.telepon}
                    onChange={(e) => setFormInfo({ ...formInfo, telepon: e.target.value })}
                  />
                </div>
              </div>

              <div className="section-label">Edit Barang</div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Jenis Perangkat</label>
                  <input
                    type="text"
                    value={formInfo.jenisPerangkat}
                    onChange={(e) => setFormInfo({ ...formInfo, jenisPerangkat: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>No Seri / IMEI</label>
                  <input
                    type="text"
                    value={formInfo.serial}
                    onChange={(e) => setFormInfo({ ...formInfo, serial: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Merek</label>
                  <input
                    type="text"
                    value={formInfo.merek}
                    onChange={(e) => setFormInfo({ ...formInfo, merek: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Model</label>
                  <input
                    type="text"
                    value={formInfo.model}
                    onChange={(e) => setFormInfo({ ...formInfo, model: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Kondisi Fisik</label>
                  <input
                    type="text"
                    value={formInfo.kondisi}
                    onChange={(e) => setFormInfo({ ...formInfo, kondisi: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Keluhan</label>
                  <input
                    type="text"
                    value={formInfo.keluhan}
                    onChange={(e) => setFormInfo({ ...formInfo, keluhan: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Kelengkapan</label>
                  <input
                    type="text"
                    value={formInfo.kelengkapan}
                    onChange={(e) => setFormInfo({ ...formInfo, kelengkapan: e.target.value })}
                  />
                </div>
              </div>

              <div className="edit-info-actions">
                <button className="btn-save" onClick={handleSaveInfo}>Simpan</button>
                <button className="btn-cancel" onClick={() => setEditInfoMode(false)}>Batal</button>
              </div>
            </div>
          )}
        </div>

        {/* DIAGNOSA */}
        <div className="detail-card diagnosa-wrapper">
          <h3>Diagnosa Terkini</h3>

          {!editMode ? (
            <div className="diagnosa-view">

              <div className="detail-grid-3">
                <div className="detail-item"><strong>Diagnosa:</strong> {selectedServis.diagnosa || "-"}</div>
                <div className="detail-item"><strong>Perbaikan:</strong> {selectedServis.perbaikan || "-"}</div>
                <div className="detail-item"><strong>Sparepart:</strong> {selectedServis.sparepart || "-"}</div>
              </div>

              <div className="detail-grid-3">
                <div className="detail-item"><strong>Estimasi Waktu:</strong> {selectedServis.waktu || "-"}</div>
                <div className="detail-item"><strong>Estimasi Biaya:</strong> {selectedServis.biaya || "-"}</div>
                <div></div>
              </div>

              <button className="btn-edit-diagnosa" onClick={() => setEditMode(true)}>
                Edit Diagnosa
              </button>
            </div>
          ) : (
            <div className="edit-diagnosa-form">

              <div className="form-grid-2">

                <div className="form-group">
                  <label>Diagnosa</label>
                  <input
                    type="text"
                    value={formDiag.diagnosa}
                    onChange={(e) =>
                      setFormDiag({ ...formDiag, diagnosa: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Perbaikan</label>
                  <input
                    type="text"
                    value={formDiag.perbaikan}
                    onChange={(e) =>
                      setFormDiag({ ...formDiag, perbaikan: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Sparepart</label>
                  <input
                    type="text"
                    value={formDiag.sparepart}
                    onChange={(e) =>
                      setFormDiag({ ...formDiag, sparepart: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Estimasi Waktu</label>
                  <input
                    type="text"
                    value={formDiag.waktu}
                    onChange={(e) =>
                      setFormDiag({ ...formDiag, waktu: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Estimasi Biaya</label>
                  <input
                    type="text"
                    value={formDiag.biaya}
                    onChange={(e) =>
                      setFormDiag({ ...formDiag, biaya: e.target.value })
                    }
                  />
                </div>

              </div>

              <div className="edit-diagnosa-actions">
                <button className="btn-save" onClick={handleSaveDiagnosa}>Simpan</button>
                <button className="btn-cancel" onClick={() => setEditMode(false)}>Batal</button>
              </div>

            </div>
          )}
        </div>

        {/* RIWAYAT PENGERJAAN */}
        <div className="detail-card">
          <h3>Riwayat Pengerjaan</h3>

          {selectedServis.log && selectedServis.log.length > 0 ? (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>User</th>
                  <th>Aktivitas</th>
                  <th>Catatan</th>
                </tr>
              </thead>

              <tbody>
                {selectedServis.log.map((l, i) => (
                  <tr key={i}>
                    <td>{l.tanggal}</td>
                    <td>{l.user}</td>
                    <td>{l.aktivitas}</td>
                    <td>{l.catatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Tidak ada riwayat pengerjaan</p>
          )}

        </div>

      </div>

    </div>
  );
};

export default DetailServis;
