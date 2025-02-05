import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LevelSelection.css"; // Import the CSS file
import pirateVideo from "../assets/pirate.mp4"; 
import bgImage from "../assets/level1.png"; 

const levels = [
  { id: 1, image: bgImage, title: "LEVEL 1" },
  { id: 2, image: bgImage, title: "LEVEL 2" },
  { id: 3, image: bgImage, title: "LEVEL 3" },
];

const LevelSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={pirateVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Navigation Bar */}
      <nav className="navbar">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <div className="nav-links flex justify-end space-x-4 p-4">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Settings</a>
        </div>
      </nav>

      <h1 className="text-5xl font-bold text-center text-brown-700 mt-4 flex justify-center items-center">
        LEVELS
      </h1>


      {/* Levels Container */}
      <div className="levels-container">
        {levels.map((level) => (
          <div 
            key={level.id} 
            className="level-card" 
            onClick={() => navigate(`/level${level.id}`)}
          >
            <img src={level.image} alt={level.title} />
            <h2 className="level-title">{level.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;
