import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../Auth";
import "./CareerSuggestion.css";

const CareerSuggestion = () => {
  const { currentUser } = useAuth();
  const [careerPaths, setCareerPaths] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          generateCareerSuggestions(userData.skills, userData.interests);
        }
      };
      fetchUserData();
    }
  }, [currentUser, db]);

  const generateCareerSuggestions = (skills, interests) => {
    const careerOptions = [
      { field: "AI Researcher", skills: ["Machine Learning", "Python"] },
      { field: "Web Developer", skills: ["React", "JavaScript"] },
      { field: "Cyber Security Analyst", skills: ["Cyber Security", "Networking"] },
      { field: "Data Scientist", skills: ["Data Analysis", "Python", "AI"] },
    ];

    const suggestions = careerOptions.filter(option =>
      option.skills.some(skill => skills.includes(skill))
    );

    setCareerPaths(suggestions.map(s => s.field));
  };

  return (
    <div className="career-container">
      <h2>Your Career Suggestions</h2>
      {careerPaths.length > 0 ? (
        <ul>
          {careerPaths.map((career, index) => (
            <li key={index}>🔥 {career}</li>
          ))}
        </ul>
      ) : (
        <p>Loading career recommendations...</p>
      )}
    </div>
  );
};

export default CareerSuggestion;
