import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Contact.css"; 

const Contact = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback!\nEmail: ${email}\nMessage: ${message}`);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Email: pirategame@example.com</p>
      <p>Phone: +123 456 7890</p>

      {/* Feedback Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="contact-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          className="contact-input"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="contact-btn">Submit</button>
      </form>

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default Contact;
