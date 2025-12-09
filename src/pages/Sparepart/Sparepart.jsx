import React, { useState } from "react";
import "../../styles/Pelanggan/Pelanggan.css"; // gunakan CSS Pelanggan yang ada di src/styles

export default function Sparepart() {
  const [search, setSearch] = useState("");

  const [sparepart, setSparepart] = useState([
  { kode: "SP001", nama: "Keyboard Logitech K120", brand: "Logitech", stok: 12, harga: 125000 },
  { kode: "SP002", nama: "Mouse Wireless Logitech M185", brand: "Logitech", stok: 20, harga: 150000 },
  { kode: "SP003", nama: "RAM DDR4 8GB 2666MHz", brand: "V-Gen", stok: 15, harga: 350000 },
  { kode: "SP004", nama: "SSD 240GB SATA", brand: "Kingston", stok: 18, harga: 290000 },
  { kode: "SP005", nama: "Thermal Paste MX-4", brand: "Arctic", stok: 25, harga: 80000 },
]);


  /* =====================================
     AUTO GENERATE KODE SPAREPART
  ===================================== */
  const generateKodeSparepart = () => {
    const last = sparepart[sparepart.length - 1]?.kode;
    if (!last) return "SP001";

    const number = parseInt(last.replace("SP", "")) + 1;
    return "SP" + String(number).padStart(3, "0");
  };

  /* ===================================== */
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    brand: "",
    stok: "",
    harga: "",
  });

  const openAddPopup = () => {
    setIsEdit(false);
    setFormData({
      kode: generateKodeSparepart(),
      nama: "",
      brand: "",
      stok: "",
      harga: "",
    });
    setShowPopup(true);
  };

  const openEditPopup = (item) => {
    setIsEdit(true);
    setFormData(item);
    setShowPopup(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      setSparepart(
        sparepart.map((p) => (p.kode === formData.kode ? formData : p))
      );
    } else {
      setSparepart([...sparepart, formData]);
    }
    setShowPopup(false);
  };

  const deleteData = (kode) => {
    if (window.confirm("Yakin ingin menghapus sparepart ini?")) {
      setSparepart(sparepart.filter((p) => p.kode !== kode));
    }
  };

  /* ===================================== */
  const filteredData = sparepart.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.kode.toLowerCase().includes(search.toLowerCase()) ||
    item.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-page">

      <h2 className="dashboard-title pelanggan-title">Data Sparepart</h2>

      <div className="pelanggan-toolbar">
        <button className="btn-tambah" onClick={openAddPopup}>Tambah</button>

        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Cari sparepart..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Kode Sparepart</th>
              <th>Nama Sparepart</th>
              <th>Nama Brand</th>
              <th>Stok</th>
              <th>Harga</th>
              <th style={{ textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.kode}>
                <td>{item.kode}</td>
                <td>{item.nama}</td>
                <td>{item.brand}</td>
                <td>{item.stok}</td>
                <td>Rp {item.harga.toLocaleString()}</td>
                <td>
                  <div className="action-icons">
                    <button className="btn-edit" onClick={() => openEditPopup(item)}>
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="btn-delete" onClick={() => deleteData(item.kode)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====================================
          POPUP SPAREPART
      ===================================== */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>{isEdit ? "Edit Sparepart" : "Tambah Sparepart"}</h3>

            <form onSubmit={handleSubmit}>
              <label>Kode Sparepart</label>
              <input type="text" value={formData.kode} readOnly />

              <label>Nama Sparepart</label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                required
              />

              <label>Nama Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
              />

              <label>Stok</label>
              <input
                type="number"
                value={formData.stok}
                onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                required
              />

              <label>Harga</label>
              <input
                type="number"
                value={formData.harga}
                onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
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
