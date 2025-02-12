import React from "react";
import { useState } from "react";

export const ProgressBar = () => {
    const [progress, setProgress] = useState(
        localStorage.getItem("progress") ? parseInt(localStorage.getItem("progress")) : 0
    );

    const handleButtonClick = () => {
        const newProgress = Math.min(100, Math.ceil(progress + 20));
        setProgress(newProgress);
    };
    
    const handleButtonReset = () => {
        setProgress(0);
    };

    const storeProgress = () => {
        localStorage.setItem("progress", progress);
    };

    const getColor = () => {
        if (progress < 50) {
            return "#ff0000";
        } else if (progress < 75) {
            return "#ffff00";
        } else {
            return "#00ff00";
        }
    };

    return {
        progress,
        handleButtonClick,
        getColor,
        handleButtonReset,
        storeProgress
    };
};


