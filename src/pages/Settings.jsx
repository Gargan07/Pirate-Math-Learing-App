import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css"; 

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      /** Add game settings here */
      <p>ADD SOUND TOGGLE OFF AND ON.</p>

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default Settings;
