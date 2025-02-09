import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css"; 

const About = () => {
  const navigate = useNavigate(); // Navigate function

  return (
    <div className="about-container">
      <h1>About Pi-RATE</h1>
      <p>Pi-RATE is an engaging and educational math adventure game designed to help elementary school students develop their math skills in a fun and interactive way. Players embark on exciting challenges that enhance their problem-solving abilities while learning important math concepts.</p>
      <h2>Meet the Team</h2>
      <div className="team-container">
        <div className="team-member">
          <div className="profile-placeholder">E</div>
          <h3>Eugene Gargantilla</h3>
          <p>Backend Developer</p>
        </div>
        <div className="team-member">
          <div className="profile-placeholder">J</div>
          <h3>John Matthew Nisperos</h3>
          <p>Backend Developer</p>
        </div>
        <div className="team-member">
          <div className="profile-placeholder">J</div>
          <h3>Jairehn Arambulo</h3>
          <p>Frontend Developer</p>
        </div>
        <div className="team-member">
          <div className="profile-placeholder">J</div>
          <h3>Justine Dela Cruz</h3>
          <p>UI/UX Designer</p>
        </div>
      </div>
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default About;
