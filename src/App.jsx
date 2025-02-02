import React from "react";
<<<<<<< Updated upstream
import LandingPage from "./pages/LandingPage"; // Import LandingPage component

function App() {
  return (
    <div>
      <LandingPage />
    </div>
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Practice from "./pages/Practice";
import SetSail from "./pages/SetSail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/set-sail" element={<SetSail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
