import "../styles/Header.css";
import { useEffect, useState } from "react";

export default function Header() {

  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Date();

    const namaHari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
    const namaBulan = [
      "Januari","Februari","Maret","April","Mei","Juni",
      "Juli","Agustus","September","Oktober","November","Desember"
    ];

    const formatTanggal =
      `${namaHari[date.getDay()]}, ${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()}`;

    setToday(formatTanggal);
  }, []);

  return (
    <header className="header-container">

      {/* ========= HANYA BAGIAN KANAN SAJA ========= */}
      <div className="header-right">
        <span className="today-date">{today}</span>

        <div className="admin-box">
          <div className="admin-avatar">A</div>
          <span className="admin-name">Admin</span>
        </div>
      </div>

    </header>
  );
}
