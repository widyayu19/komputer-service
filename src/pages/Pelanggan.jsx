import React, { useState } from "react";
import "../styles/Pelanggan.css";

export default function Pelanggan() {
  const [search, setSearch] = useState("");

  const [pelanggan, setPelanggan] = useState([
    { id: "CUST001", nama: "Andi Pratama", telp: "081234567890", alamat: "Jl. Raya Ubud No.15, Gianyar, Bali" },
    { id: "CUST002", nama: "Budi Santoso", telp: "081234567891", alamat: "Jl. Raya Seminyak No.10, Kuta, Bali" },
    { id: "CUST003", nama: "Citra Dewi", telp: "081298765432", alamat: "Jl. Pantai Kuta No.21, Badung, Bali" },
    { id: "CUST004", nama: "Dwi Kurniawan", telp: "085612345678", alamat: "Jl. Monkey Forest No.20, Ubud, Bali" },
    { id: "CUST005", nama: "Farah Nabila", telp: "087612341234", alamat: "Jl. Raya Tanah Lot No.3, Tabanan, Bali" },
    { id: "CUST006", nama: "Eka Saputra", telp: "081377889900", alamat: "Jl. Raya Canggu No.5, Badung, Bali" },
  ]);

  /* ==============================
     GENERATE AUTOMATIC ID
  ============================== */
  const generateCustomerId = () => {
    const lastId = pelanggan[pelanggan.length - 1]?.id;
    if (!lastId) return "CUST001";

    const lastNumber = parseInt(lastId.replace("CUST", ""));
    const newNumber = lastNumber + 1;

    return "CUST" + String(newNumber).padStart(3, "0");
  };

  /* ==============================
     POPUP STATES
  ============================== */
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nama: "",
    telp: "",
    alamat: ""
  });

  /* ==============================
     OPEN POPUP TAMBAH
  ============================== */
  const openAddPopup = () => {
    setIsEdit(false);
    setFormData({
      id: generateCustomerId(),
      nama: "",
      telp: "",
      alamat: ""
    });
    setShowPopup(true);
  };

  /* ==============================
     OPEN POPUP EDIT
  ============================== */
  const openEditPopup = (item) => {
    setIsEdit(true);
    setFormData(item);
    setShowPopup(true);
  };

  /* ==============================
     SUBMIT POPUP
  ============================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      setPelanggan(
        pelanggan.map((p) => (p.id === formData.id ? formData : p))
      );
    } else {
      setPelanggan([...pelanggan, formData]);
    }

    setShowPopup(false);
  };

  /* ==============================
     DELETE DATA
  ============================== */
  const deleteData = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setPelanggan(pelanggan.filter((p) => p.id !== id));
    }
  };

  /* ==============================
     SEARCH FILTER
  ============================== */
  const filteredData = pelanggan.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.id.toLowerCase().includes(search.toLowerCase()) ||
    item.telp.includes(search)
  );

  return (
    <div className="dashboard-page">

      <h2 className="dashboard-title pelanggan-title">Data Pelanggan</h2>

      <div className="pelanggan-toolbar">
        <button className="btn-tambah" onClick={openAddPopup}>Tambah</button>

        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Cari pelanggan..."
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
              <th>Id Pelanggan</th>
              <th>Nama Pelanggan</th>
              <th>No.Telepon</th>
              <th>Alamat</th>
              <th style={{ textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className="id-link">{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.telp}</td>
                <td>{item.alamat}</td>
                <td>
                  <div className="action-icons">
                    <button className="btn-edit" onClick={() => openEditPopup(item)}>
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="btn-delete" onClick={() => deleteData(item.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ==============================
          POPUP FORM
      ============================== */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>{isEdit ? "Edit Pelanggan" : "Tambah Pelanggan"}</h3>

            <form onSubmit={handleSubmit}>
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
              ></textarea>

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
