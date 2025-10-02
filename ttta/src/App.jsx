import React from "react";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "3rem", color: "#1E40AF" }}>TT Tracker</h1>
        <p style={{ color: "#555" }}>
          Your private hub for table tennis tracking
        </p>
      </header>

      <main
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "300px",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Welcome!</h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>
          Track your games, view stats, and connect with other members.
        </p>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <button
            style={{
              backgroundColor: "#1E40AF",
              color: "#fff",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            style={{
              border: "2px solid #1E40AF",
              color: "#1E40AF",
              padding: "0.5rem",
              borderRadius: "6px",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </div>
      </main>

      <footer style={{ marginTop: "2rem", color: "#888" }}>
        &copy; {new Date().getFullYear()} TT Tracker
      </footer>
    </div>
  );
}
