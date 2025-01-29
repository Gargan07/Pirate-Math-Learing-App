import React from "react";
import "../styles/LandingPage.css"; // Import CSS

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Navigation Bar*/}
      <nav className="navbar">
        <div className="logo">🏴‍☠️ Pi-RATE</div>
        <div className="nav-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Settings</a>
        </div>
      </nav>

      {/* Main Content*/}
      <div className="content">
        <h1>SOLVE, SAIL, CONQUER!</h1>
        <p>
          Pi-RATE is an exciting math game for kids! Set sail on a sea of fun,
          solve math puzzles, and unlock treasures as you sharpen your skills
          along the way!
        </p>
        
        {/* Buttons Section*/}
        <div className="buttons">
          <button className="btn">Practice</button>
          <button className="btn primary">Play Now</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
