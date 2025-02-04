import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LevelSelection from "./pages/LevelSelection";
import Level1 from "./pages/Level1";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/levels" element={<LevelSelection />} />
        <Route path="/level1" element={<Level1/>} />
      </Routes>
    </Router>
  );
}

export default App;
