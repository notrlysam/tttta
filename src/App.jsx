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
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#121212",
        color: "#FFFFFF",
        padding: "1rem",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", color: "#E53935" }}>TT Tracker</h1>
        <p style={{ color: "#BBBBBB" }}>
          Track your matches, improve your game, stay competitive.
        </p>
      </header>

      {/* Main Card */}
      <main
        style={{
          backgroundColor: "#1E1E1E",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
          textAlign: "center",
          width: "350px",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
          Welcome Back!
        </h2>
        <p style={{ color: "#BBBBBB", marginBottom: "2rem" }}>
          Log in to see your matches, stats, and leaderboard.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button
            style={{
              backgroundColor: "#E53935",
              color: "#FFFFFF",
              padding: "0.8rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#B71C1C")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#E53935")}
          >
            Login
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "2px solid #E53935",
              color: "#E53935",
              padding: "0.8rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#E53935";
              e.target.style.color = "#FFFFFF";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#E53935";
            }}
          >
            Register
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ marginTop: "3rem", color: "#888888" }}>
        &copy; {new Date().getFullYear()} TT Tracker
      </footer>
    </div>
  );
}
