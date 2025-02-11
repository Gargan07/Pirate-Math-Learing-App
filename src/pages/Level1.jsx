import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Level1.css";
import choicesImg from "../assets/choices.png";
import { ProgressBar } from "../game_components/ProgressBar";
import "../styles/ProgressBar.css";
import CountdownTimer from "../game_components/CountDownTimer";

function Level1() {
  const navigate = useNavigate();
  const [showNextLevelPopup, setShowNextLevelPopup] = useState(false); // New state for popup
  const [penalty, setPenalty] = useState(0);
  const [showPenaltyAlert, setShowPenaltyAlert] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  
  const currentLevel = 1;
  const { progress, handleButtonClick, getColor, handleButtonReset } = ProgressBar();

  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [answerChoices, setAnswerChoices] = useState([]);

  const timerRef = useRef();

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function generateAnswerChoices(correctAnswer) {
    let choices = [correctAnswer];
    let usedNumbers = new Set(choices);

    while (choices.length < 3) {
      let randNum = generateRandomNumber();
      if (!usedNumbers.has(randNum)) {
        choices.push(randNum);
        usedNumbers.add(randNum);
      }
    }

    return choices.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    const correctAnswer = num1 + num2;
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
  

  const handleChoiceClick = (num) => {
    if (num === num1 + num2) {
      handleButtonClick();
      setNum1(generateRandomNumber());
      setNum2(generateRandomNumber());
      setPenalty(0);
    } else {
      handleButtonReset();
      if (timerRef.current) {
        timerRef.current.applyPenalty();
      }
      setShowPenaltyAlert(true);
      setTimeout(() => {
        setShowPenaltyAlert(false);
      }, 300);
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setLevelComplete(false);
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setPenalty(0);
    setShowPenaltyAlert(false);
  };

  const handleRetry = () => {
    setGameStarted(false);
    setGameOver(false);
    setLevelComplete(false);
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setPenalty(0);
    setShowPenaltyAlert(false);
  };

  const handleBack = () => {
    navigate("/set-sail");
  };

  const handleNextLevel = () => {
    navigate(`/level${currentLevel + 1}`);
  };

  const handleTimeUp = () => {
    setGameOver(true);
  };

  return (
    <div className="level1-container">
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
          <span className="level-title">LEVEL 1</span>
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

          {showPenaltyAlert && (
            <div className="penalty-alert">
              <span>-5s Penalty Applied!</span>
            </div>
          )}

          <div className="game-content">
            <div className="question-container">
              <span className="question-text">{num1} + {num2} =</span>
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
        <div className="next-level-popup">Next Level Unlocked!</div>
      )}
    </div>
  );
}

export default Level1;
