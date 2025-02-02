import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Contact.css"; 
const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Email: pirategame@example.com</p>
      <p>Phone: +123 456 7890</p>
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};
export default Contact;