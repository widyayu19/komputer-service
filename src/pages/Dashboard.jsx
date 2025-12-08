import React from "react";
import { FaCalendarAlt, FaUsers, FaDollarSign, FaSearch } from "react-icons/fa";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Judul Halaman */}
      <h2 className="dashboard-title">Dashboard</h2>

      {/* CARD SECTION */}
      <section className="cards">

        {/* CARD 1 */}
        <div className="card card-blue">
          <div className="card-header">
            <span>Servis Baru (Harian)</span>
            <FaCalendarAlt className="card-icon" />
          </div>
          <h2 className="card-value">3</h2>
        </div>

        {/* CARD 2 */}
        <div className="card card-orange">
          <div className="card-header">
            <span>Total Pelanggan</span>
            <FaUsers className="card-icon" />
          </div>
          <h2 className="card-value">6</h2>
        </div>

        {/* CARD 3 */}
        <div className="card card-red">
          <div className="card-header">
            <span>Total Pendapatan Bulan Ini</span>
            <FaDollarSign className="card-icon" />
          </div>
          <h2 className="card-value">Rp.0</h2>
        </div>

      </section>

      {/* TABLE SECTION */}
      <section className="table-section">

        {/* TITLE + SEARCH */}
        <div className="table-header">
          <h3 className="section-title">Pengambilan Hari Ini</h3>

          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
        </div>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Kode Servis</th>
              <th>Nama Pelanggan</th>
              <th>No. Telepon</th>
              <th>Merek & Model</th>
              <th>Kelengkapan Bawaan</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>SVC001</td>
              <td>Andi Pratama</td>
              <td>0812-3456-789</td>
              <td>Asus VivoBook 14</td>
              <td>Charger, Tas Laptop</td>
            </tr>
            <tr>
              <td>SVC002</td>
              <td>Budi Santoso</td>
              <td>0857-1122-334</td>
              <td>Lenovo ThinkPad X1</td>
              <td>Charger</td>
            </tr>
            <tr>
              <td>SVC003</td>
              <td>Citra Dewi</td>
              <td>0821-7788-990</td>
              <td>Acer Aspire 5</td>
              <td>Unit Saja</td>
            </tr>
            <tr>
              <td>SVC004</td>
              <td>Dwi Kurniawan</td>
              <td>0813-2233-445</td>
              <td>HP Pavilion 14</td>
              <td>Charger, Mouse</td>
            </tr>
            <tr>
              <td>SVC005</td>
              <td>Farah Nabila</td>
              <td>0852-6677-889</td>
              <td>Dell Inspiron 15</td>
              <td>Charger, HDD Eksternal</td>
            </tr>
            <tr>
              <td>SVC006</td>
              <td>Eka Saputra</td>
              <td>0812-3456-789</td>
              <td>MacBook Air M1</td>
              <td>Charger, Tas Laptop</td>
            </tr>
          </tbody>
        </table>

        {/* Footer Pagination */}
        <div className="table-footer">
          <span>Showing 1 to 6 of 6 entries</span>
          <div className="pagination">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>Next</button>
          </div>
        </div>
      </section>

    </div>
  );
}
