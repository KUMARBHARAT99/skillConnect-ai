import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../Auth";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    skills: "",
    field: "",
    education: "",
    profilePic: "",
  });

  const db = getFirestore();
  const storage = getStorage();

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

  // ✅ Profile Image Upload Function
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(`Uploading: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUserData((prevData) => ({ ...prevData, profilePic: downloadURL }));
        console.log("Image uploaded:", downloadURL);
      }
    );
  };

  // ✅ Save Profile Data
  const handleSave = async () => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, userData, { merge: true });
      alert("Profile Updated!");
      navigate("/user-profile");
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <img src={userData.profilePic || "default-avatar.png"} alt="Profile" className="profile-pic" />
        
        {/* ✅ Image Upload Input */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Skills"
          value={userData.skills}
          onChange={(e) => setUserData({ ...userData, skills: e.target.value })}
        />
        <input
          type="text"
          placeholder="Field"
          value={userData.field}
          onChange={(e) => setUserData({ ...userData, field: e.target.value })}
        />
        <input
          type="text"
          placeholder="Education"
          value={userData.education}
          onChange={(e) => setUserData({ ...userData, education: e.target.value })}
        />

        <button onClick={handleSave} className="save-btn">Save Changes</button>
        <button onClick={() => navigate("/user-profile")} className="back-btn">Go Back</button>
      </div>
    </div>
  );
};

export default Profile;







