import React from "react";
import { useNavigate } from "react-router-dom";

const Practice = () => {
  const navigate = useNavigate(); // Navigation function

  return (
    <div className="page-container">
      <h1>Practice Your Math Skills! 🧮</h1>
      <p>Sharpen your skills before setting sail on your adventure!</p>
      <button className="btn" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Practice;
