import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [careerPaths, setCareerPaths] = useState([]);
  const [services, setServices] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserName(userData.name || "User");
          generateCareerSuggestions(userData.skills || []);
          setServices(userData.services || []);
        }
      };
      fetchUserData();
    }
  }, [currentUser, db]);

  const generateCareerSuggestions = (skills) => {
    const careerOptions = [
      { field: "Software Engineer", skills: ["JavaScript", "React", "Node.js"] },
      { field: "Data Scientist", skills: ["Python", "Machine Learning", "Data Analysis"] },
      { field: "UI/UX Designer", skills: ["Figma", "Adobe XD", "Wireframing"] },
      { field: "AI Researcher", skills: ["AI", "Deep Learning", "Neural Networks"] },
      { field: "Electrician", skills: ["Wiring", "Household Repairs"] },
      { field: "Plumber", skills: ["Pipes", "Drainage", "Repairing"] },
      { field: "Carpenter", skills: ["Woodwork", "Furniture Repair"] },
    ];

    const suggestions = careerOptions.filter(option =>
      option.skills.some(skill => skills.includes(skill))
    );

    setCareerPaths(suggestions.map(s => s.field));
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userName}!</h1>
      
      <div className="dashboard-sections">
      <button onClick={() => navigate("/add-service")}>Add Service</button>
        <button onClick={() => navigate("/profile")}>Go to Profile</button>
        <button onClick={() => navigate("/services")}>Find Services</button>
        <button onClick={() => navigate("/career-advice")}>Career Suggestions</button>
        <button className="logout-btn" onClick={() => navigate("/logout")}>Logout</button>
      </div>

      {/* ✅ Service Section */}
      <div className="service-section">
        <h2>Available Services</h2>
        {services.length > 0 ? (
          <ul className="service-list">
            {services.map((service, index) => (
              <li key={index}>🛠 {service}</li>
            ))}
          </ul>
        ) : (
          <p>No services added yet.</p>
        )}
      </div>
      
      {/* ✅ Career Section */}
      <div className="career-section">
        <h2>Your Career Suggestions</h2>
        {careerPaths.length > 0 ? (
          <ul className="career-list">
            {careerPaths.map((career, index) => (
              <li key={index}>🔥 {career}</li>
            ))}
          </ul>
        ) : (
          <p>Loading career recommendations...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;




