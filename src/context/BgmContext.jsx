import React, { createContext, useState, useEffect, useRef } from "react";
import pirateBgm from "../assets/pirate-bgm.mp3";

export const BgmContext = createContext();

export const BgmProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(
    localStorage.getItem("bgmSetting") === "on"
  );
  const audioRef = useRef(new Audio(pirateBgm));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    if (isPlaying) {
      audio.play().catch((err) => console.log("Autoplay prevented:", err));
    } else {
      audio.pause();
    }

    
    localStorage.setItem("bgmSetting", isPlaying ? "on" : "off");

    return () => {
      audio.pause();
    };
  }, [isPlaying]);

 
  const toggleBgm = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <BgmContext.Provider value={{ isPlaying, toggleBgm }}>
      {children}
    </BgmContext.Provider>
  );
};
