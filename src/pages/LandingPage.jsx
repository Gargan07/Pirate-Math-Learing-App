import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import router components
import "../styles/LandingPage.css"; // Import CSS
import pirateVideo from "../assets/pirate.mp4"; // Import the pirate video
import logoImage from "../assets/logo.png"; // Import logo image

const LandingPage = () => {
  const navigate = useNavigate(); // Enables navigation

  return (
    <div className="page-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={pirateVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        {/* Logo Section - Positioned above the title */}
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className="logo" />
        </div>

        {/* Heading */}
        <h1>Solve, Sail, and Conquer!</h1>

        {/* Buttons Section */}
        <div className="buttons">
          <button className="btn" onClick={() => navigate("/practice")}>
            Practice Your Skills
          </button>
          <button className="btn" onClick={() => navigate("/set-sail")}>
            Set Sail Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
