import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BgmContext } from "../context/BgmContext";
import "../styles/LandingPage.css";
import pirateVideo from "../assets/pirate.mp4";
import logoImage from "../assets/logo.png";

// Define the fade-in-up animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page-container">
      {/* Background Video */}
      <video autoPlay loop muted className="landing-background-video">
        <source src={pirateVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="nav-links">
          <Link to="#" onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}>
            About
          </Link>
          <Link to="#" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
            Contact
          </Link>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>

      {/* Main Content */}
      <motion.div className="content" initial="hidden" animate="visible" variants={fadeInUp}>
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className="logo" />
        </div>
        <h1>Solve, Sail, and Conquer!</h1>
        <div className="buttons">
          <motion.button className="btn" onClick={() => navigate("/practice")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Practice Your Skills
          </motion.button>
          <motion.button className="btn" onClick={() => navigate("/set-sail")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Set Sail Now!
          </motion.button>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        id="about"
        className="section about-section"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ amount: 0.3 }}
      >
        <h1>About Pi-RATE</h1>
        <p>
          Pi-RATE is an engaging and educational math adventure game designed to help elementary school students develop their math skills in a fun and interactive way. Players embark on exciting challenges that enhance their problem-solving abilities while learning important math concepts.
        </p>
        <h2>Meet the Team</h2>
        <div className="team-container">
          {[
            { name: "Eugene Gargantilla", role: "Backend Developer" },
            { name: "John Matthew Nisperos", role: "Backend Developer" },
            { name: "Jairehn Arambulo", role: "Frontend Developer" },
            { name: "Justine Dela Cruz", role: "UI/UX Designer" },
          ].map((member, index) => (
            <motion.div className="team-member" key={index} variants={fadeInUp}>
              <div className="profile-placeholder">{member.name.charAt(0)}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        id="contact"
        className="section contact-section"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ amount: 0.3 }}
      >
        <h2>Contact Us</h2>
        <p>Have questions or want to join the crew? Reach out to us!</p>
        <form className="contact-form">
          <motion.input type="text" placeholder="Your Name" required whileFocus={{ scale: 1.05 }} />
          <motion.input type="email" placeholder="Your Email" required whileFocus={{ scale: 1.05 }} />
          <motion.textarea placeholder="Your Message" required whileFocus={{ scale: 1.05 }}></motion.textarea>
          <motion.button type="submit" className="btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LandingPage;
