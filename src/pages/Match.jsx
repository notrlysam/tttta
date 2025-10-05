// src/pages/Match.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Match() {
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [redSets, setRedSets] = useState(0);
  const [blueSets, setBlueSets] = useState(0);

  const bestOf = 5;
  const winningSets = Math.ceil(bestOf / 2);

  // Determine current server (alternate every 2 points)
  const currentServer = (redScore + blueScore) % 4 < 2 ? "red" : "blue";

  const incrementRed = () => updateScore("red", 1);
  const decrementRed = () => updateScore("red", -1);

  const incrementBlue = () => updateScore("blue", 1);
  const decrementBlue = () => updateScore("blue", -1);

  const updateScore = (player, delta) => {
    if (matchWinner) return; // don't allow changes after match ends
    if (player === "red") {
      const newScore = Math.max(0, redScore + delta);
      if (delta > 0 && newScore >= 11 && newScore - blueScore >= 2) {
        setRedSets(redSets + 1);
        resetPoints();
      } else {
        setRedScore(newScore);
      }
    } else {
      const newScore = Math.max(0, blueScore + delta);
      if (delta > 0 && newScore >= 11 && newScore - redScore >= 2) {
        setBlueSets(blueSets + 1);
        resetPoints();
      } else {
        setBlueScore(newScore);
      }
    }
  };

  const resetPoints = () => {
    setRedScore(0);
    setBlueScore(0);
  };

  const resetMatch = () => {
    resetPoints();
    setRedSets(0);
    setBlueSets(0);
  };

  const matchWinner =
    redSets === winningSets ? "Red" : blueSets === winningSets ? "Blue" : null;

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
        padding: "2rem",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{ fontSize: "4rem", color: "#E53935", marginBottom: "0.5rem" }}
        >
          TT Tracker
        </h1>
        <p style={{ color: "#BBBBBB", fontSize: "1.5rem" }}>
          Official Scoreboard
        </p>
      </header>

      {/* Match Winner */}
      {matchWinner && (
        <div
          style={{
            marginBottom: "2rem",
            fontSize: "2rem",
            color: "#FFD700",
            fontWeight: "bold",
          }}
        >
          {matchWinner} Wins the Match! 🎉
        </div>
      )}

      {/* Scoreboard */}
      <div
        style={{
          display: "flex",
          gap: "3rem",
          marginBottom: "3rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Red Player Card */}
        <div
          style={{
            backgroundColor: "#B71C1C",
            color: "#FFFFFF",
            width: "250px",
            height: "250px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "4rem",
            position: "relative",
            boxShadow:
              currentServer === "red"
                ? "0 0 30px #FF5252"
                : "0 0 15px rgba(0,0,0,0.5)",
            transition: "all 0.3s",
          }}
        >
          <span style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Red
          </span>
          <span>{redScore}</span>

          {/* Set indicators */}
          <div style={{ marginTop: "20px", display: "flex", gap: "0.5rem" }}>
            {Array.from({ length: bestOf }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  backgroundColor: i < redSets ? "#FFD700" : "#FFFFFF50",
                }}
              />
            ))}
          </div>

          {/* + / - buttons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "20px" }}>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: "#FF5252",
                color: "#FFFFFF",
                fontSize: "1rem",
              }}
              onClick={incrementRed}
            >
              +1
            </button>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: "#880E0E",
                color: "#FFFFFF",
                fontSize: "1rem",
              }}
              onClick={decrementRed}
            >
              -1
            </button>
          </div>
        </div>

        {/* Blue Player Card */}
        <div
          style={{
            backgroundColor: "#1E88E5",
            color: "#FFFFFF",
            width: "250px",
            height: "250px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "4rem",
            position: "relative",
            boxShadow:
              currentServer === "blue"
                ? "0 0 30px #448AFF"
                : "0 0 15px rgba(0,0,0,0.5)",
            transition: "all 0.3s",
          }}
        >
          <span style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Blue
          </span>
          <span>{blueScore}</span>

          {/* Set indicators */}
          <div style={{ marginTop: "20px", display: "flex", gap: "0.5rem" }}>
            {Array.from({ length: bestOf }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  backgroundColor: i < blueSets ? "#FFD700" : "#FFFFFF50",
                }}
              />
            ))}
          </div>

          {/* + / - buttons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "20px" }}>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: "#448AFF",
                color: "#FFFFFF",
                fontSize: "1rem",
              }}
              onClick={incrementBlue}
            >
              +1
            </button>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: "#0B3D91",
                color: "#FFFFFF",
                fontSize: "1rem",
              }}
              onClick={decrementBlue}
            >
              -1
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
        <button
          style={{
            padding: "1rem 2rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor: "#E53935",
            color: "#FFFFFF",
            fontSize: "1.2rem",
          }}
          onClick={resetMatch}
        >
          Reset Match
        </button>

        <Link to="/">
          <button
            style={{
              padding: "1rem 2rem",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              backgroundColor: "#9E9E9E",
              color: "#FFFFFF",
              fontSize: "1.2rem",
            }}
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
