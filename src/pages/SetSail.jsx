import React from "react";
import { useNavigate } from "react-router-dom";

const SetSail = () => {
  const navigate = useNavigate(); // Navigation function

  return (
    <div className="page-container">
      <h1>Set Sail on Your Adventure! ⚓</h1>
      <p>Embark on your pirate journey and solve exciting puzzles!</p>
      <button className="btn" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default SetSail;
