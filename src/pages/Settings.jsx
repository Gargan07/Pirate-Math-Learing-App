import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BgmContext } from "../context/BgmContext"; 
import "../styles/Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const { isPlaying, toggleBgm } = useContext(BgmContext); // ✅ Now it exists!

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {/* Settings Group Container */}
      <div className="settings-group-container">
        {/* Sound Toggle Switch */}
        <div className="toggle-container">
          <label className="toggle-label">Background Music:</label>
          <div className="toggle-switch" onClick={toggleBgm}>
            <div className={`toggle-slider ${isPlaying ? "on" : "off"}`}>
              {isPlaying ? "ON 🔊" : "OFF 🔇"}
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default Settings;
