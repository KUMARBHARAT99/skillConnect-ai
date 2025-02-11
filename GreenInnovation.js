import React from "react";
import "./GreenInnovation.css";
import { useNavigate } from "react-router-dom";

const GreenInnovation = () => {
  const navigate = useNavigate();

  return (
    <div className="green-innovation-container">
      <h1>Green Innovation & Sustainability</h1>
      <div className="intro">
        <p>
          🌱 Our platform connects users based on **skills & experience**, allowing them to
          collaborate on **eco-friendly solutions** for environmental issues.  
          Users can **share their problems**, and **experts + AI** will help generate solutions. 🚀
        </p>
      </div>

      <div className="features">
        <h2>How Our Platform Helps?</h2>
        <ul>
          <li>🌍 **Collaborate** with green-tech experts</li>
          <li>💡 **AI-powered recommendations** for sustainability</li>
          <li>🔄 **Job & project matchmaking** for green initiatives</li>
          <li>📝 **Community discussions** on environmental problems</li>
        </ul>
      </div>

      <div className="action">
        <h2>Join Us Today!</h2>
        <p>Become part of a growing network of **eco-conscious professionals & learners**.</p>
        <button className="join-btn" onClick={() => navigate("/signup")}>Sign Up Now</button>
      </div>
    </div>
  );
};

export default GreenInnovation;


