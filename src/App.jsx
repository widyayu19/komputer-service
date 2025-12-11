// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";     
import MainLayout from "./Layout/MainLayout";

// Halaman utama
import Dashboard from "./pages/Dashboard";     

// Pelanggan
import DetailPelanggan from "./pages/Pelanggan/DetailPelanggan";
import PelangganBaru from "./pages/Pelanggan/PelangganBaru";

// Servis
import ServisBaru from "./pages/Servis/ServisBaru";
import DetailServis from "./pages/Servis/DetailServise";

// Sperpart
import KategoriSperpart from "./pages/Sperpart/KategoriSperpart";
import SperpartBaru from "./pages/Sperpart/SperpartBaru";
import DetailSperpart from "./pages/Sperpart/DetailSperpart";

// User
import UserBaru from "./pages/User/UserBaru";        // Tambahan
import DetailUser from "./pages/User/DetailUser";    // Tambahan

export default function App() {
  return (
    <Routes>
      {/* Login tidak pakai layout */}
      <Route path="/" element={<LoginPage />} />

      {/* Semua halaman dengan layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Pelanggan */}
        <Route path="/pelanggan-baru" element={<PelangganBaru />} />
        <Route path="/pelanggan" element={<DetailPelanggan />} />

        {/* Servis */}
        <Route path="/servis-baru" element={<ServisBaru />} />
        <Route path="/servis" element={<DetailServis />} />

        {/* Sperpart */}
        <Route path="/kategori-sperpart" element={<KategoriSperpart />} />
        <Route path="/sperpart-baru" element={<SperpartBaru />} />
        <Route path="/sperpart" element={<DetailSperpart />} />

        {/* User */}
        <Route path="/user-baru" element={<UserBaru />} />
<Route path="/user" element={<DetailUser />} />

      </Route>
    </Routes>
  );
}
