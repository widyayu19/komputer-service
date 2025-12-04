// src/LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Di sini kamu bisa tambahkan logika autentikasi
    navigate("/dashboard"); // arahkan ke halaman Dashboard
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">
          <i className="fas fa-user"></i>
        </div>
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            LOGIN
          </button>

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
