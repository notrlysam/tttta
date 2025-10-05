import React, { useState } from "react";

const TableTennisScore = () => {
  const [matchType, setMatchType] = useState(3);
  const gamesToWin = Math.ceil(matchType / 2);

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Games, setPlayer1Games] = useState(0);
  const [player2Games, setPlayer2Games] = useState(0);
  const [currentServer, setCurrentServer] = useState(1);

  const addPoint = (player) => {
    if (player === 1) setPlayer1Score((prev) => prev + 1);
    if (player === 2) setPlayer2Score((prev) => prev + 1);

    updateServer();
    setTimeout(checkGameWinner, 0);
  };

  const updateServer = () => {
    const totalPoints = player1Score + player2Score + 1;
    if (totalPoints < 20) {
      setCurrentServer(totalPoints % 4 < 2 ? 1 : 2);
    } else {
      setCurrentServer(totalPoints % 2 === 0 ? 1 : 2);
    }
  };

  const checkGameWinner = () => {
    if (player1Score >= 11 && player1Score - player2Score >= 2) {
      setPlayer1Games((prev) => prev + 1);
      resetScores();
      checkMatchWinner();
    } else if (player2Score >= 11 && player2Score - player1Score >= 2) {
      setPlayer2Games((prev) => prev + 1);
      resetScores();
      checkMatchWinner();
    }
  };

  const checkMatchWinner = () => {
    if (player1Games === gamesToWin) {
      alert("Player 1 wins the match!");
      resetMatch();
    } else if (player2Games === gamesToWin) {
      alert("Player 2 wins the match!");
      resetMatch();
    }
  };

  const resetScores = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
  };

  const resetMatch = () => {
    resetScores();
    setPlayer1Games(0);
    setPlayer2Games(0);
    setCurrentServer(1);
  };

  return (
    <div
      style={{
        backgroundColor: "#1E1E1E",
        padding: "1rem",
        borderRadius: "16px",
        width: "350px",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Table Tennis Score</h2>

      <label>
        Match Type:
        <select
          value={matchType}
          onChange={(e) => setMatchType(Number(e.target.value))}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value={3}>Best of 3</option>
          <option value={5}>Best of 5</option>
        </select>
      </label>

      <div style={{ marginTop: "1rem" }}>
        <p>
          Player 1: {player1Score} (Games: {player1Games})
        </p>
        <p>
          Player 2: {player2Score} (Games: {player2Games})
        </p>
        <p>Current Server: Player {currentServer}</p>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => addPoint(1)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            backgroundColor: "#E53935",
            color: "#FFF",
            border: "none",
            cursor: "pointer",
          }}
        >
          +1 Player 1
        </button>
        <button
          onClick={() => addPoint(2)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            backgroundColor: "#E53935",
            color: "#FFF",
            border: "none",
            cursor: "pointer",
          }}
        >
          +1 Player 2
        </button>
      </div>

      <button
        onClick={resetMatch}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          backgroundColor: "#555",
          color: "#FFF",
          border: "none",
          cursor: "pointer",
        }}
      >
        Reset Match
      </button>
    </div>
  );
};

export default TableTennisScore;
