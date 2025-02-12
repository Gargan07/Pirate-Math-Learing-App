import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import pirateTut from "../assets/pirateTut.mp4";  // Assuming you have the tutorial video file
import "../styles/Tutorial.css";

// Define the fade-in-up animation variants for smooth animation
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Tutorial = () => {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page-container">
      {/* Navigation Bar */}
      <nav className="level-selection-navbar">
        <div className="nav-links">
          <button className="back-button" onClick={() => navigate("/")}>Back</button>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>

      <motion.div
        className="tutorial-video-container"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="tutorial-title">Pirate Adventure Tutorial</h1>

        {/* Tutorial Video */}
        <video controls autoPlay muted className="tutorial-video">
          <source src={pirateTut} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <p className="tutorial-description">
          Watch the tutorial video to learn how to set sail and embark on your math adventure.
        </p>
      </motion.div>
    </div>
  );
};

export default Tutorial;
