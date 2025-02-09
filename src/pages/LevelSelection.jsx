import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LevelSelection.css"; 
import pirateVideo from "../assets/pirate.mp4"; 
import bgImage1 from "../assets/Level1.png";
import bgImage2 from "../assets/Level2.png";
import bgImage3 from "../assets/Level3.png";
import bgImage4 from "../assets/Level4.jpg"; 

const levels = [
  { id: 1, image: bgImage1, title: "LEVEL 1" },
  { id: 2, image: bgImage2, title: "LEVEL 2" },
  { id: 3, image: bgImage3, title: "LEVEL 3" },
  { id: 4, image: bgImage4, title: "LEVEL 4" },
];

const LevelSelection = () => {
  const navigate = useNavigate();

  return (
<div className="level-page-container relative">
  {/* Background Video */}
  <video autoPlay loop muted className="background-video">
    <source src={pirateVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Navigation Bar */}
    <nav className="level-selection-navbar">
      <div className="nav-links flex justify-between p-4 w-full">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <a href="Settings" className="nav-link">Settings</a>
      </div>
    </nav>

  {/* Heading */}
  <h1 className="level-selection-heading">LEVELS</h1>

  {/* Levels Grid */}
  <div className="levels-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 w-full mx-auto">
    {levels.map(({ id, image, title }) => (
      <div 
        key={id} 
        className="level-card cursor-pointer transform hover:scale-105 transition duration-300" 
        onClick={() => navigate(`/level${id}`)}
      >
        <img src={image} alt={`Thumbnail for ${title}`} className="w-full h-auto rounded-lg shadow-md" />
        <h2 className="level-title text-center text-lg font-semibold mt-2">{title}</h2>
      </div>
    ))}
  </div>

  {/* Instructions */}
  <div className="instruction">
    <p>Click on any level to begin your adventure!</p>
    <p>Use the Back button to return to the previous page.</p>
  </div>
</div>

  );
};

export default LevelSelection;
