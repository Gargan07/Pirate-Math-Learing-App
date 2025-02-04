import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css"; // Ensure this file exists

const Settings = () => {
  const navigate = useNavigate();
  
  // Load sound preference from localStorage
  const [soundOn, setSoundOn] = useState(
    localStorage.getItem("soundSetting") === "on"
  );

  // Toggle sound state
  const toggleSound = () => {
    const newSoundState = !soundOn;
    setSoundOn(newSoundState);
    localStorage.setItem("soundSetting", newSoundState ? "on" : "off");
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {/* Sound Toggle Switch */}
      <div className="toggle-container">
        <label className="toggle-label">Sound:</label>
        <div className="toggle-switch" onClick={toggleSound}>
          <div className={`toggle-slider ${soundOn ? "on" : "off"}`}>
            {soundOn ? "ON 🔊" : "OFF 🔇"}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default Settings;
