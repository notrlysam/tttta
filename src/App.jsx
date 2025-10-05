// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Match from "./pages/Match";

export default function App() {
  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>TT Tracker</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/" style={{ color: "#FFFFFF", textDecoration: "none" }}>
            Home
          </Link>
          <Link
            to="/match"
            style={{ color: "#FFFFFF", textDecoration: "none" }}
          >
            Match
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </div>
  );
}
