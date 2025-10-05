// src/pages/Match.jsx
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function Match() {
  const [playerNames, setPlayerNames] = useState({
    red: "Player A",
    blue: "Player B",
  });

  const [scores, setScores] = useState({ red: 0, blue: 0 });
  const [sets, setSets] = useState({ red: 0, blue: 0 });
  const [timeouts, setTimeouts] = useState({ red: 1, blue: 1 });
  const [sideSwitched, setSideSwitched] = useState(false);

  const bestOf = 5;
  const winningSets = Math.ceil(bestOf / 2);
  const currentServer = (scores.red + scores.blue) % 4 < 2 ? "red" : "blue";

  const matchWinner =
    sets.red === winningSets
      ? "red"
      : sets.blue === winningSets
      ? "blue"
      : null;

  // Reset and side switch logic (moved before updateScore to fix initialization order)
  const handleSideSwitch = useCallback(() => {
    setScores({ red: 0, blue: 0 });
    setSideSwitched((prev) => !prev);
  }, []);

  const resetMatch = useCallback(() => {
    setScores({ red: 0, blue: 0 });
    setSets({ red: 0, blue: 0 });
    setTimeouts({ red: 1, blue: 1 });
    setSideSwitched(false);
  }, []);

  // Scoring logic (now after handleSideSwitch)
  const updateScore = useCallback(
    (player, delta) => {
      if (matchWinner) return;
      const opponent = player === "red" ? "blue" : "red";

      const newScore = Math.max(0, scores[player] + delta);
      const opponentScore = scores[opponent];

      if (delta > 0 && newScore >= 11 && newScore - opponentScore >= 2) {
        setSets((prev) => ({ ...prev, [player]: prev[player] + 1 }));
        handleSideSwitch();
      } else {
        setScores((prev) => ({ ...prev, [player]: newScore }));
      }
    },
    [matchWinner, scores, handleSideSwitch]
  ); // Dependencies for stability

  const callTimeout = useCallback(
    (player) => {
      if (timeouts[player] > 0)
        setTimeouts((prev) => ({ ...prev, [player]: prev[player] - 1 }));
    },
    [timeouts]
  );

  const handleNameChange = useCallback((player, value) => {
    setPlayerNames((prev) => ({ ...prev, [player]: value }));
  }, []);

  // Memoized handlers for red player
  const redOnPlus = useCallback(() => updateScore("red", 1), [updateScore]);
  const redOnMinus = useCallback(() => updateScore("red", -1), [updateScore]);
  const redOnTimeout = useCallback(() => callTimeout("red"), [callTimeout]);
  const redOnNameChange = useCallback(
    (val) => handleNameChange("red", val),
    [handleNameChange]
  );

  // Memoized handlers for blue player
  const blueOnPlus = useCallback(() => updateScore("blue", 1), [updateScore]);
  const blueOnMinus = useCallback(() => updateScore("blue", -1), [updateScore]);
  const blueOnTimeout = useCallback(() => callTimeout("blue"), [callTimeout]);
  const blueOnNameChange = useCallback(
    (val) => handleNameChange("blue", val),
    [handleNameChange]
  );

  const PlayerCard = React.memo(
    ({
      color,
      score,
      setsWon,
      timeoutCount,
      playerName,
      onPlus,
      onMinus,
      onTimeout,
      onNameChange,
      isServing,
    }) => {
      // Local state for hover effects (stable within memoized component)
      const [plusHovered, setPlusHovered] = useState(false);
      const [minusHovered, setMinusHovered] = useState(false);
      const [timeoutHovered, setTimeoutHovered] = useState(false);

      const getButtonStyle = (bg, hoverBg, size = "1rem") => ({
        background: `linear-gradient(145deg, ${bg}, ${hoverBg})`,
        color: "#fff",
        border: "none",
        borderRadius: "15px",
        padding: "0.8rem 1.5rem",
        fontSize: size,
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: `0 4px 15px ${bg}20`,
        minWidth: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      });

      const plusStyle = {
        ...getButtonStyle("#00E676", "#00C853", "1.1rem"),
        background: plusHovered
          ? "linear-gradient(145deg, #00C853, #00E676)"
          : "linear-gradient(145deg, #00E676, #00C853)",
        boxShadow: plusHovered
          ? "0 6px 20px #00E67640"
          : "0 4px 15px #00E67620",
        transform: plusHovered ? "translateY(-2px)" : "none",
      };

      const minusStyle = {
        ...getButtonStyle("#FF1744", "#D50000", "1.1rem"),
        background: minusHovered
          ? "linear-gradient(145deg, #D50000, #FF1744)"
          : "linear-gradient(145deg, #FF1744, #D50000)",
        boxShadow: minusHovered
          ? "0 6px 20px #FF174440"
          : "0 4px 15px #FF174420",
        transform: minusHovered ? "translateY(-2px)" : "none",
      };

      const timeoutStyle = {
        backgroundColor:
          timeoutCount === 0 ? "#555" : timeoutHovered ? "#FFA000" : "#FFD700",
        color: timeoutCount === 0 ? "#AAA" : "#000",
        marginTop: "0.5rem", // Reduced from 0.8rem to save space
        padding: "0.6rem 1rem", // Slightly smaller padding
        borderRadius: "12px",
        border: "none",
        cursor: timeoutCount === 0 ? "not-allowed" : "pointer",
        fontWeight: "bold",
        fontSize: "1rem",
        width: "85%", // Slightly wider to fit better
        transition: "all 0.3s ease",
        boxShadow:
          timeoutCount === 0
            ? "none"
            : `0 4px 15px ${timeoutHovered ? "#FFA000" : "#FFD700"}20`,
        transform:
          timeoutHovered && timeoutCount > 0 ? "translateY(-2px)" : "none",
      };

      return (
        <div
          style={{
            background: `linear-gradient(145deg, ${
              color === "red" ? "#B71C1C" : "#1E88E5"
            }, ${color === "red" ? "#D32F2F" : "#1976D2"})`,
            color: "#FFFFFF",
            width: "320px",
            height: "420px", // Increased height to prevent cutoff
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem",
            boxShadow: isServing
              ? `0 0 35px ${
                  color === "red" ? "#FF5252" : "#448AFF"
                }, inset 0 0 20px rgba(255,255,255,0.1)`
              : "0 0 25px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.05)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Serving indicator */}
          {isServing && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "20px",
                height: "20px",
                backgroundColor: "#FFD700",
                borderRadius: "50%",
                border: "3px solid #000",
                opacity: "0.8", // Fallback for animation if no CSS
                // Note: For full pulse animation, add @keyframes pulse to your global CSS
              }}
            />
          )}

          {/* Player Name Input */}
          <div style={{ width: "100%", textAlign: "center" }}>
            <input
              value={playerName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder={
                color === "red" ? "Enter Red Player" : "Enter Blue Player"
              }
              style={{
                width: "90%",
                padding: "0.8rem 1rem",
                fontSize: "1.4rem",
                fontWeight: "600",
                textAlign: "center",
                borderRadius: "12px",
                border: "2px solid rgba(255,255,255,0.2)",
                outline: "none",
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.25)";
                e.target.style.borderColor = "rgba(255,255,255,0.5)";
                e.target.style.transform = "scale(1.02)";
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.target.style.borderColor = "rgba(255,255,255,0.2)";
                e.target.style.transform = "none";
              }}
            />
          </div>

          {/* Score Display - Enhanced with glow and animation */}
          <div
            style={{
              fontSize: "7rem",
              fontWeight: "900",
              textShadow: isServing
                ? `0 0 20px ${color === "red" ? "#FF5252" : "#448AFF"}`
                : "0 0 10px rgba(255,255,255,0.5)",
              transition: "all 0.4s ease",
              transform: "scale(1)",
              // Note: For scorePulse animation, add @keyframes to global CSS
            }}
          >
            {score}
          </div>

          {/* Set circles - Larger and more styled */}
          <div
            style={{ display: "flex", gap: "0.8rem", marginBottom: "0.5rem" }}
          >
            {" "}
            {/* Reduced marginBottom */}
            {Array.from({ length: bestOf }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  background:
                    i < setsWon
                      ? "linear-gradient(145deg, #FFD700, #FFA000)"
                      : "rgba(255,255,255,0.2)",
                  border:
                    i < setsWon
                      ? "3px solid #FF8F00"
                      : "2px solid rgba(255,255,255,0.3)",
                  boxShadow:
                    i < setsWon
                      ? "0 0 15px #FFD70040"
                      : "0 2px 5px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Control buttons - Enhanced with hover */}
          <div
            style={{ display: "flex", gap: "1.5rem", marginBottom: "0.5rem" }}
          >
            {" "}
            {/* Reduced marginBottom */}
            <button
              style={plusStyle}
              onClick={onPlus}
              onMouseEnter={() => setPlusHovered(true)}
              onMouseLeave={() => setPlusHovered(false)}
            >
              +1
            </button>
            <button
              style={minusStyle}
              onClick={onMinus}
              onMouseEnter={() => setMinusHovered(true)}
              onMouseLeave={() => setMinusHovered(false)}
            >
              -1
            </button>
          </div>

          {/* Timeout - Enhanced */}
          <button
            onClick={onTimeout}
            disabled={timeoutCount === 0}
            onMouseEnter={() => timeoutCount > 0 && setTimeoutHovered(true)}
            onMouseLeave={() => setTimeoutHovered(false)}
            style={timeoutStyle}
          >
            ⏱️ Timeout ({timeoutCount})
          </button>
        </div>
      );
    }
  );

  // Note: Add these to your global CSS for animations (e.g., in index.css or App.css)
  // @keyframes pulse {
  //   0%, 100% { opacity: 1; transform: scale(1); }
  //   50% { opacity: 0.5; transform: scale(1.1); }
  // }
  // @keyframes scorePulse {
  //   0% { transform: scale(1); }
  //   50% { transform: scale(1.1); }
  //   100% { transform: scale(1); }
  // }
  // .pulse { animation: pulse 1s infinite; }
  // For score pulse, you can add a class on score change via useEffect if needed.

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #121212, #1e1e1e)",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          background: "linear-gradient(45deg, #E53935, #FF5722)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "0.5rem",
          textShadow: "0 0 20px rgba(229, 57, 53, 0.5)",
        }}
      >
        TT Tracker
      </h1>
      <p style={{ color: "#BBBBBB", fontSize: "1.3rem", marginBottom: "2rem" }}>
        Official Match Scoreboard
      </p>

      {matchWinner && (
        <div
          style={{
            background: "linear-gradient(145deg, #FFD700, #FFA000)",
            color: "#000",
            padding: "1.5rem 2.5rem",
            borderRadius: "16px",
            marginBottom: "2rem",
            fontSize: "2rem",
            fontWeight: "bold",
            boxShadow: "0 8px 25px #FFD70040",
            // Note: For slideIn animation, add @keyframes slideIn to global CSS
          }}
        >
          🏆 {playerNames[matchWinner]} Wins the Match!
        </div>
      )}

      {/* Scoreboard */}
      <div
        style={{
          display: "flex",
          gap: "3.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        {sideSwitched ? (
          <>
            <PlayerCard
              color="blue"
              playerName={playerNames.blue}
              score={scores.blue}
              setsWon={sets.blue}
              timeoutCount={timeouts.blue}
              onPlus={blueOnPlus}
              onMinus={blueOnMinus}
              onTimeout={blueOnTimeout}
              onNameChange={blueOnNameChange}
              isServing={currentServer === "blue"}
            />
            <PlayerCard
              color="red"
              playerName={playerNames.red}
              score={scores.red}
              setsWon={sets.red}
              timeoutCount={timeouts.red}
              onPlus={redOnPlus}
              onMinus={redOnMinus}
              onTimeout={redOnTimeout}
              onNameChange={redOnNameChange}
              isServing={currentServer === "red"}
            />
          </>
        ) : (
          <>
            <PlayerCard
              color="red"
              playerName={playerNames.red}
              score={scores.red}
              setsWon={sets.red}
              timeoutCount={timeouts.red}
              onPlus={redOnPlus}
              onMinus={redOnMinus}
              onTimeout={redOnTimeout}
              onNameChange={redOnNameChange}
              isServing={currentServer === "red"}
            />
            <PlayerCard
              color="blue"
              playerName={playerNames.blue}
              score={scores.blue}
              setsWon={sets.blue}
              timeoutCount={timeouts.blue}
              onPlus={blueOnPlus}
              onMinus={blueOnMinus}
              onTimeout={blueOnTimeout}
              onNameChange={blueOnNameChange}
              isServing={currentServer === "blue"}
            />
          </>
        )}
      </div>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <button style={buttonStyle("#E53935", "1.2rem")} onClick={resetMatch}>
          Reset Match
        </button>
        <Link to="/">
          <button style={buttonStyle("#9E9E9E", "1.2rem")}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = (bg, size = "1rem") => ({
  background: `linear-gradient(145deg, ${bg}, ${bg}cc)`,
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "0.8rem 1.5rem",
  fontSize: size,
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: `0 4px 15px ${bg}20`,
  // Note: For hover effects on bottom buttons, consider adding onMouseEnter/Leave or global CSS
});
