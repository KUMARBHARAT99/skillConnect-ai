import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../Auth";
import "./Profile.css";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const db = getFirestore();

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      };
      fetchUserData();
    }
  }, [currentUser, db]);

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {userData ? (
        <div className="profile-card">
          <img src={userData.profilePic || "default-avatar.png"} alt="Profile" className="profile-pic" />
          <h2>{userData.name}</h2>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Skills:</strong> {userData.skills}</p>
          <p><strong>Field:</strong> {userData.field}</p>
          <p><strong>Education:</strong> {userData.education}</p>
          <button onClick={() => navigate("/profile")} className="edit-btn">Edit Profile</button>
          <button onClick={() => navigate("/dashboard")} className="back-btn">Go Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;

