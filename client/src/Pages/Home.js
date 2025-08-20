import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      padding: "30px",
      borderRadius: "10px",
      textAlign: "center",
      maxWidth: "500px",
    }}>
      <h1>Welcome to FoodGoal</h1>
      <p>Your one-stop platform for discovering, ordering, and enjoying amazing food experiences.</p>
      <button
        style={{
          padding: "10px 20px",
          margin: "10px",
          border: "none",
          borderRadius: "5px",
          background: "#f8b500",
          color: "white",
          cursor: "pointer",
          fontSize: "1rem"
        }}
        onClick={() => navigate("/login")}
      >
        Login
      </button>
      <button
        style={{
          padding: "10px 20px",
          margin: "10px",
          border: "none",
          borderRadius: "5px",
          background: "#ff7e5f",
          color: "white",
          cursor: "pointer",
          fontSize: "1rem"
        }}
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </button>
    </div>
  );
}

export default Home;
