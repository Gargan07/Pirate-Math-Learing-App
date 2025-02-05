    import React, { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import "../styles/Level1.css";
    import choicesImg from "../assets/choices.png"; 
    import { ProgressBar } from "../game_components/ProgressBar";
    import "../styles/ProgressBar.css";

    function Level1() {
        const navigate = useNavigate();
        const { progress, handleButtonClick, getColor, handleButtonReset } = ProgressBar();

        // State to store the equation numbers and answer
        const [num1, setNum1] = useState(generateRandomNumber());
        const [num2, setNum2] = useState(generateRandomNumber());
        const [answerChoices, setAnswerChoices] = useState([]);

        // Function to generate a random number between 1 and 10
        function generateRandomNumber() {
            return Math.floor(Math.random() * 10) + 1;
        }

        // Function to generate and shuffle answer choices efficiently
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

            // Shuffle choices using a more optimized approach
            return choices.sort(() => Math.random() - 0.5);
        }

        

        // Update answer choices whenever num1 or num2 changes
        useEffect(() => {
            const correctAnswer = num1 + num2;
            setAnswerChoices(generateAnswerChoices(correctAnswer));
        }, [num1, num2]); // Runs when num1 or num2 changes

        // Function to handle choice click
        const handleChoiceClick = (num) => {
            if (num === num1 + num2) {
                handleButtonClick();
                // Generate new question & answers
                const newNum1 = generateRandomNumber();
                const newNum2 = generateRandomNumber();
                setNum1(newNum1);
                setNum2(newNum2);
            } else {
                handleButtonReset();
            }
        };

        return (
            <div className="level1-container">
                {/* Navigation Bar */}
                <nav className="navbar">
                    <div className="navbar-left">
                        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                        <span className="level-title">LEVEL 1</span>
                    </div>
                    <div className="nav-links">
                        <a href="#">Menu</a>
                        <a href="#">Settings</a>
                    </div>
                </nav>

                {/* Progress Bar */}
                <div className="progress">
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: getColor() }}>{" "}</div>
                        </div>
                    </div>
                </div>

                {/* Game Content */}
                <div className="game-content">
                    {/* Math Problem */}
                    <div className="question-container">
                        <span className="question-text">{num1} + {num2} =</span>
                    </div>

                    {/* Answer Choices */}
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
                    {/* Instructions at the Bottom */}
            <div className="instructions">
            <p>Choose your answer for this question.</p>
            <p>Tick-tock! The bomb is ticking!</p>
            </div>
        </div>
            </div>
        );
    }

    export default Level1;
