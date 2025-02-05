import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Level3.css";
import choicesImg from "../assets/choices.png"; // Import the image

function Level3() {
    const navigate = useNavigate();

    return (
        <div className="level1-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-left">
                    {/* Back Button */}
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                    <span className="level-title">LEVEL 3</span>
                </div>
                <div className="nav-links">
                    <a href="#">About</a>
                    <a href="#">Practice</a>
                    <a href="#">Settings</a>
                </div>
            </nav>

            {/* Game Content */}
            <div className="game-content">
                {/* Math Problem */}
                <div className="question-container">
                    <span className="question-text">3⁵ =</span>
                </div>

                {/* Answer Choices */}
                <div className="choices-container">
                    {[125, 243, 321].map((num) => (
                        <button key={num} className="choice-button">
                            <img src={choicesImg} alt="Choice" className="choice-image" />
                            <span className="choice-text">{num}</span>
                        </button>
                    ))}
                </div>
                {/* Instructions at the Bottom */}
          <div className="instructions">
          <p>Choose your answer for this question.</p>
          <p>Tick-tock! The bomb is ticking!</p>
        </div>
      </div>
        </div>
    );
}

export default Level3;
