import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <h1>Empower Your Future with AI</h1>
      <p>Discover career opportunities tailored just for you.</p>
      
      {/* ✅ Link to "/get-started" */}
      <Link to="/get-started" className="hero-btn">
        Get Started
      </Link>
    </div>
  );
};

export default Hero;



