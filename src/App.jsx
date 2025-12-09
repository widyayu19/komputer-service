// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MainLayout from "./Layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Pelanggan from "./pages/Pelanggan";
import Servis from "./pages/Servis";
import Sparepart from "./pages/Sparepart";
import User from "./pages/User";

export default function App() {
  return (
    <Routes>

      {/* Login tidak memakai layout */}
      <Route path="/" element={<LoginPage />} />

      {/* Semua halaman utama memakai layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/servis" element={<Servis />} />
        <Route path="/sparepart" element={<Sparepart />} />
        <Route path="/datauser" element={<User />} />
      </Route>
      
    </Routes>
  );
}
