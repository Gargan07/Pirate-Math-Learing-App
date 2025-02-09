// CountdownTimer Component
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import "../styles/CountdownTimer.css"; // Import the CSS

const CountdownTimer = forwardRef(({ onTimeUp }, ref) => {
  const [time, setTime] = useState(60); // Start countdown from 60 seconds

  // Method to apply penalty by 5 seconds
  const applyPenalty = () => {
    setTime((prevTime) => Math.max(prevTime - 5, 0)); // Apply a -5 seconds penalty
  };

  // Expose the applyPenalty method to parent component through the ref
  useImperativeHandle(ref, () => ({
    applyPenalty
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1; // Decrease time by 1 second
        } else {
          clearInterval(interval); // Stop the timer when it reaches 0
          onTimeUp(); // Trigger game over in parent component when time is up
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [onTimeUp]);

  return (
    <div className="timer-container">
      <div className="overlay">
        <span className="timer">{time}</span>
      </div>
    </div>
  );
});

export default CountdownTimer;
