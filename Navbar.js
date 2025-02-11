import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="navLogo"><Link to="/">SkillConnect-AI</Link></h2>
      <ul className="navLinks">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/green-innovation">Green Innovation</Link></li>
        <li><Link to="/career-advice">Career Advice</Link></li>
      </ul>
      <div className="navButtons">
        <Link to="/get-started" className="get-started-btn">Get Started</Link>  {/* ✅ Navbar में Get Started */}
        {user ? (
          <div className="user-menu">
            <Link to="/profile" className="profile-btn">Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




