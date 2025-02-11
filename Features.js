import React from "react";

const Features = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🚀 Explore the Advanced Features of SkillConnect-AI</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
        <div style={featureCardStyle}>
          <h2>📊 AI Career Growth Tracker</h2>
          <p>Track career progress and get AI-powered improvement suggestions.</p>
        </div>

        <div style={featureCardStyle}>
          <h2>📈 Smart Industry Trends Insights</h2>
          <p>Real-time AI analysis of job market trends and opportunities.</p>
        </div>

        <div style={featureCardStyle}>
          <h2>💼 AI-powered Internship & Job Applications</h2>
          <p>Get AI-driven assistance in job applications, resumes, and cover letters.</p>
        </div>

        <div style={featureCardStyle}>
          <h2>🧠 AI Skill Mentor & Learning Path</h2>
          <p>Personalized AI learning roadmap with recommended skill enhancements.</p>
        </div>

        <div style={featureCardStyle}>
          <h2>🎤 AI-powered Mock Interviews</h2>
          <p>Practice real-time AI mock interviews with feedback on confidence and voice.</p>
        </div>

        <div style={featureCardStyle}>
          <h2>🔍 Resume & LinkedIn Profile AI Optimization</h2>
          <p>AI-driven resume keyword optimization and LinkedIn networking suggestions.</p>
        </div>

        <div style={featureCardStyle}>
          <h2>🤝 AI-powered Networking Hub</h2>
          <p>AI suggests professional connections and networking opportunities.</p>
        </div>
      </div>
    </div>
  );
};

const featureCardStyle = {
  width: "250px",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  backgroundColor: "#f9f9f9",
  textAlign: "center"
};

export default Features;
