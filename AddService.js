import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useAuth } from "../Auth";
import { useNavigate } from "react-router-dom";
import "./AddService.css";

const AddService = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !email) {
      setMessage("❌ Please fill all fields.");
      return;
    }

    try {
      const db = getFirestore();
      await addDoc(collection(db, "services"), {
        name,
        category,
        email,
        createdAt: new Date(),
      });

      setMessage("✅ Service Added Successfully!");
      setTimeout(() => {
        navigate("/dashboard"); // 🎯 Auto-redirect to Dashboard after 2 sec
      }, 2000);

      setName("");
      setCategory("");
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error adding service. Try again.");
    }
  };

  return (
    <div className="add-service">
      <h1>Add Your Service</h1>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Painter">Painter</option>
          <option value="Designer">Designer</option>
        </select>

        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Add Service</button>
      </form>
      <button onClick={() => navigate("/find-service")}>View Services</button> {/* 🔥 Manual Button */}
      <button onClick={() => navigate("/")}>Go to Home</button> {/* 🔥 Go to Home */}
    </div>
  );
};

export default AddService;


