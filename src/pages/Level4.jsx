import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Level4.css";
import choicesImg from "../assets/choices.png";
import { ProgressBar } from "../game_components/ProgressBar";
import "../styles/ProgressBar.css";
import CountdownTimer from "../game_components/CountDownTimer";

function Level4() {
  const navigate = useNavigate();
  const [showNextLevelPopup, setShowNextLevelPopup] = useState(false); // New state for popup
  const [showPenaltyAlert, setShowPenaltyAlert] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);

  const currentLevel = 4; // Track current level
  const { progress, handleButtonClick, getColor, handleButtonReset } = ProgressBar();

  // State for question & answer choices
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerChoices, setAnswerChoices] = useState([]);

  const timerRef = useRef();

  // Function to generate random numbers (avoiding zero)
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  // Function to generate answer choices with similar formatting
  function generateAnswerChoices(correctAnswer) {
    let choices = new Set([correctAnswer]); // Include correct answer first

    // Check if correct answer has decimals
    const isDecimal = correctAnswer % 1 !== 0;

    while (choices.size < 3) {
      let randNum = isDecimal
        ? (Math.random() * 10).toFixed(2) // Generate decimal number
        : Math.floor(Math.random() * 10) + 1; // Generate integer

      choices.add(randNum);
    }

    return Array.from(choices).sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    const answer = num1 / num2;
    const formattedAnswer = answer % 1 === 0 ? answer : parseFloat(answer.toFixed(2)); // Ensure proper format
    setCorrectAnswer(formattedAnswer);
    setAnswerChoices(generateAnswerChoices(formattedAnswer));
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
  const handleChoiceClick = (selected) => {
    const selectedAnswer = parseFloat(selected);
    
    if (selectedAnswer === correctAnswer) {
      handleButtonClick();
      setNum1(generateRandomNumber());
      setNum2(generateRandomNumber());
    } else {
      handleButtonReset();
      if (timerRef.current) timerRef.current.applyPenalty();

      // Show penalty alert
      setShowPenaltyAlert(true);
      setTimeout(() => setShowPenaltyAlert(false), 300);
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setLevelComplete(false);
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
  };

  const handleRetry = () => {
    setGameStarted(false);
    setGameOver(false);
    setLevelComplete(false);
  };

  const handleBack = () => navigate("/set-sail");

  const handleNextLevel = () => navigate(`/level${currentLevel + 1}`);

  const handleTimeUp = () => setGameOver(true);

  return (
    <div className="level4-container">
      {!gameStarted && !gameOver && !levelComplete && (
        <div className="start-overlay" onClick={handleStartGame}>
          <span className="start-text">Click Anywhere to Start the Game!</span>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-left">
          <button className="back-button" onClick={handleBack}>Back</button>
          <span className="level-title">LEVEL 4</span>
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
                <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: getColor() }}></div>
              </div>
            </div>
          </div>

          <div className="timer-container">
            <CountdownTimer ref={timerRef} onTimeUp={handleTimeUp} />
          </div>

          {showPenaltyAlert && <div className="penalty-alert">-5s Penalty Applied!</div>}

          <div className="game-content">
            <div className="question-container">
              <span className="question-text">{num1} / {num2} =</span>
            </div>

            <div className="choices-container">
              {answerChoices.map((choice) => (
                <button key={choice} className="choice-button" onClick={() => handleChoiceClick(choice)}>
                  <img src={choicesImg} alt="Choice" className="choice-image" />
                  <span className="choice-text">{choice}</span>
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

      {gameOver && (
        <div className="game-over-form">
          <h2>Game Over!</h2>
          <div className="game-over-buttons">
            <button onClick={handleRetry}>Retry</button>
            <button onClick={handleBack}>Back</button>
          </div>
        </div>
      )}

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
        <div className="next-level-popup">All Levels Completed!</div>
      )}
    </div>
  );
}

export default Level4;
