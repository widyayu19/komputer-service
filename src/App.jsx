// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MainLayout from "./Layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import DetailPelanggan from "./pages/Pelanggan/DetailPelanggan";
import PelangganBaru from "./pages/Pelanggan/PelangganBaru";
import ServisBaru from "./pages/Servis/ServisBaru";
import DetailServis from "./pages/Servis/DetailServise";
import Sparepart from "./pages/Sparepart/Sparepart";
import User from "./pages/User/User";

export default function App() {
  return (
    <Routes>
      {/* Login tidak memakai layout */}
      <Route path="/" element={<LoginPage />} />

      {/* Semua halaman utama memakai layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pelanggan-baru" element={<PelangganBaru />} />
        <Route path="/pelanggan" element={<DetailPelanggan />} />
        <Route path="/servis-baru" element={<ServisBaru />} />
        <Route path="/servis" element={<DetailServis />} />
        <Route path="/sparepart" element={<Sparepart />} />
        <Route path="/user" element={<User />} />
      </Route>
    </Routes>
  );
}
