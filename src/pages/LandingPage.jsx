import React from "react";
<<<<<<< Updated upstream
import "../styles/LandingPage.css"; // Import CSS
=======
import { Link, useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import pirateVideo from "../assets/pirate.mp4";
import logoImage from "../assets/logo.png";
>>>>>>> Stashed changes

const LandingPage = () => {
  const navigate = useNavigate(); // Enables navigation

  return (
<<<<<<< Updated upstream
    <div className="landing-container">
      {/* Navigation Bar*/}
=======
    <div className="page-container">
      <video autoPlay loop muted className="background-video">
        <source src={pirateVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navigation Bar */}
>>>>>>> Stashed changes
      <nav className="navbar">
        <div className="logo">🏴‍☠️ Pi-RATE</div>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>

      {/* Main Content*/}
      <div className="content">
<<<<<<< Updated upstream
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
=======
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className="logo" />
        </div>

        <h1>Solve, Sail, and Conquer!</h1>

        {/* Navigation Buttons */}
        <div className="buttons">
          <button className="btn" onClick={() => navigate("/practice")}>
            Practice Your Skills
          </button>
          <button className="btn" onClick={() => navigate("/set-sail")}>
            Set Sail Now!
          </button>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
