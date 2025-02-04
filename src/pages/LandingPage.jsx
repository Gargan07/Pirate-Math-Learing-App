import React from "react";
import "../styles/LandingPage.css"; // Import the LandingPage CSS from the correct path
import pirateVideo from "../assets/pirate.mp4"; // Ensure the pirate video is correctly imported
import logoImage from "../assets/logo.png"; // Import logo image correctly if it's used in the component

const LandingPage = () => {
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
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Settings</a>
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
          <button className="btn">Practice Your Skills</button>
          <button className="btn">Set Sail Now!</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;