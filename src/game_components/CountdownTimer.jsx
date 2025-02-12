import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import "../styles/CountdownTimer.css";

const CountdownTimer = forwardRef(({ onTimeUp }, ref) => {
  const storedTime = localStorage.getItem("countdownTime");
  const [time, setTime] = useState(storedTime ? parseInt(storedTime, 10) : 60);

  const applyPenalty = () => {
    setTime((prevTime) => {
      const newTime = Math.max(prevTime - 5, 0);
      localStorage.setItem("countdownTime", newTime);
      return newTime;
    });
  };

  useImperativeHandle(ref, () => ({
    applyPenalty,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          localStorage.setItem("countdownTime", newTime);
          return newTime;
        } else {
          clearInterval(interval);
          localStorage.removeItem("countdownTime");
          onTimeUp();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  return (
    <div className="overlay">
      <span className="timer">{time}</span>
    </div>
  );
});

export default CountdownTimer;
