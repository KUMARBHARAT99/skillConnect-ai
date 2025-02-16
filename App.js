import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GetStarted from "./components/GetStarted";  // ✅ Import Get Started Page
import ChatComponent from "./components/ChatComponent";
import { environment } from "./environment";  
import GreenInnovation from "./components/GreenInnovation"; 
import { generateAIResponse } from "./services/watsonxService";
import Footer from "./components/Footer";
import Features from "./components/Features"; 
import AddService from "./components/AddService";
import FindServices from "./components/FindServices";
import Profile from "./components/Profile"; 
import Dashboard from "./components/Dashboard";
import CareerSuggestion from "./components/CareerSuggestion"; 
import UserProfile from "./components/Userprofile"; 
import Login from "./components/Login"; 
import Signup from "./components/Signup"; 
import { AuthProvider } from "./Auth";  
import PrivateRoute from "./PrivateRoute"; 
import "./components/Navbar.css";
import "./components/Footer.css";
import "./components/Hero.css";

// ✅ Debugging Logs
console.log("Watsonx API Key:", environment.watsonx.apiKey);
console.log("Watsonx URL:", environment.watsonx.serviceUrl);
console.log("Firebase API Key:", environment.firebase.apiKey);

// ✅ Simple Pages
const About = () => <h1>About Us</h1>;
const Contact = () => <h1>Contact Us</h1>;

// ✅ AI Test Function
const testAI = async () => {
  const response = await generateAIResponse("What is AI?");
  console.log("Watsonx AI Response:", response);
};

testAI();

// ✅ Main App Component
function App() {
  return (
    <div>
      <h1>Welcome to SkillConnect-AI</h1>
      <ChatComponent />
      <AuthProvider> 
        <Router>
          <Navbar />
          <Hero />
          <Features />
          <main className="content">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/get-started" element={<GetStarted />} />  
              <Route path="/find-services" element={<FindServices />} />
              <Route path="/add-service" element={<AddService />} />
              <Route path="/user-profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/green-innovation" element={<GreenInnovation />} />
              <Route path="/career-advice" element={<PrivateRoute><CareerSuggestion /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* ✅ Protected Dashboard Route */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App; // ✅ Export App Component







