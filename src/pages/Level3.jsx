import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Level3.css";
import choicesImg from "../assets/choices.png";
import { ProgressBar } from "../game_components/ProgressBar";
import "../styles/ProgressBar.css";
import CountdownTimer from "../game_components/CountDownTimer";

function Level3() {
  const navigate = useNavigate();
  const [showNextLevelPopup, setShowNextLevelPopup] = useState(false); // New state for popup
  const [penalty, setPenalty] = useState(0); // Track penalty value
  const [showPenaltyAlert, setShowPenaltyAlert] = useState(false); // Track penalty alert visibility
  const [gameStarted, setGameStarted] = useState(false); // Track whether the game has started
  const [gameOver, setGameOver] = useState(false); // Track if game is over
  const [levelComplete, setLevelComplete] = useState(false); // Track if level is complete

  const currentLevel = 3; // Track current level
  const { progress, handleButtonClick, getColor, handleButtonReset } = ProgressBar();

  // State to store the equation numbers and answer
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [answerChoices, setAnswerChoices] = useState([]);

  const timerRef = useRef();

  // Function to generate random numbers
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  // Function to generate and shuffle answer choices efficiently
// Function to generate and shuffle answer choices efficiently
function generateAnswerChoices(correctAnswer) {
    let choices = new Set([correctAnswer]);
  
    while (choices.size < 3) {
      let deviation = Math.floor(Math.random() * 4) + 1; // Small deviation (1-4)
      let randNum = correctAnswer + (Math.random() < 0.5 ? -deviation : deviation); // Closer to the correct answer
  
      if (randNum > 0) { // Ensure no negative choices
        choices.add(randNum);
      }
    }
  
    return [...choices].sort(() => Math.random() - 0.5);
  }
  
  useEffect(() => {
    const correctAnswer = num1 * num2;
    setAnswerChoices(generateAnswerChoices(correctAnswer));
  }, [num1, num2]);

  useEffect(() => {
    if (progress >= 100) {
      setLevelComplete(true);
  
      // Retrieve unlocked levels from local storage
      const unlockedLevels = JSON.parse(localStorage.getItem("unlockedLevels")) || {};
  
      // Check if the next level is already unlocked
      const nextLevel = currentLevel + 1;
      if (!unlockedLevels[nextLevel]) {
        // Unlock the next level
        unlockedLevels[nextLevel] = true;
        localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels));
  
        // Show the popup when the next level is newly unlocked
        setShowNextLevelPopup(true);
  
        // Hide the popup after 3 seconds
        setTimeout(() => {
          setShowNextLevelPopup(false);
        }, 3000);
      }
    }
  }, [progress]);

  // Handle choice click
  const handleChoiceClick = (num) => {
    if (num === num1 * num2) {
      handleButtonClick();
      // Generate new question & answers
      const newNum1 = generateRandomNumber();
      const newNum2 = generateRandomNumber();
      setNum1(newNum1);
      setNum2(newNum2);

      setPenalty(0); // Reset penalty on correct answer
    } else {
      handleButtonReset();
      if (timerRef.current) {
        timerRef.current.applyPenalty(); // Apply penalty when wrong answer is clicked
      }

      // Show the penalty alert and hide it after 500ms
      setShowPenaltyAlert(true);
      setTimeout(() => {
        setShowPenaltyAlert(false);
      }, 300); // Alert duration is 500ms
    }
  };

  // Start the game when user clicks the overlay
  const handleStartGame = () => {
    setGameStarted(true); // Game starts when clicked
    setGameOver(false); // Reset game over state
    setLevelComplete(false); // Reset level complete state
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setPenalty(0);
    setShowPenaltyAlert(false);
  };

  // Retry the game
  const handleRetry = () => {
    setGameStarted(false);
    setGameOver(false);
    setLevelComplete(false);
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setPenalty(0);
    setShowPenaltyAlert(false);
  };

  // Go back to the previous page
  const handleBack = () => {
    navigate("/set-sail");
  };

  // Go to the next level (level 2 in this case)
  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    navigate(`/level${nextLevel}`);
  };

  // Handle game over logic when time runs out
  const handleTimeUp = () => {
    setGameOver(true); // Set gameOver to true when time is up
  };

  return (
    <div className="level3-container">
      {/* Start Game Overlay */}
      {!gameStarted && !gameOver && !levelComplete && (
        <div className="start-overlay" onClick={handleStartGame}>
          <span className="start-text">Click Anywhere to Start the Game!</span>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-left">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <span className="level-title">LEVEL 3</span>
        </div>
        <div className="navbar-right">
        <div className="nav-links">
          <a href="#">Menu</a>
          <a href="Settings">Settings</a>
        </div>
        </div>
      </nav>

      {gameStarted && !gameOver && !levelComplete && (
        <>
          <div className="progress">
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%`, backgroundColor: getColor() }}
                ></div>
              </div>
            </div>
          </div>

          <div className="timer-container">
            <CountdownTimer ref={timerRef} onTimeUp={handleTimeUp} />
          </div>

          {/* Red Overlay Alert for penalty */}
          {showPenaltyAlert && (
            <div className="penalty-alert">
              <span>-5s Penalty Applied!</span>
            </div>
          )}

          <div className="game-content">
            <div className="question-container">
              <span className="question-text">{num1} * {num2} =</span>
            </div>

            <div className="choices-container">
              {answerChoices.map((num) => (
                <button
                  key={num}
                  className="choice-button"
                  onClick={() => handleChoiceClick(num)}
                >
                  <img src={choicesImg} alt="Choice" className="choice-image" />
                  <span className="choice-text">{num}</span>
                </button>
              ))}
            </div>

            <div className="instructions">
              <p>Choose your answer for this question.</p>
              <p>Tick-tock! The bomb is ticking!</p>
            </div>
          </div>
        </>
      )}

      {/* Game Over Form */}
      {gameOver && (
        <div className="game-over-form">
          <h2>Game Over!</h2>
          <div className="game-over-buttons">
            <button onClick={handleRetry}>Retry</button>
            <button onClick={handleBack}>Back</button>
          </div>
        </div>
      )}

      {/* Level Complete Form */}
      {levelComplete && (
        <div className="level-complete-form">
          <h2>Level Complete!</h2>
          <div className="level-complete-buttons">
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNextLevel}>Next Level</button>
            <button onClick={handleRetry}>Retry</button>
          </div>
        </div>
      )}

      {showNextLevelPopup && (
        <div className="next-level-popup">Next Level Unlocked!</div>
      )}
      
    </div>
  );
}

export default Level3;
