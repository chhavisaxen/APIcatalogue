import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const images = [
  "/assets/Avenger.webp",
  "/assets/bajaj man pulsar.jpg",
  "/assets/Pulsar BIke 2.webp",
  "/assets/Pulsar Bike.webp",
  "/assets/ktm-rc8-motorcycle-vehicle-black-wallpaper.jpg"
];

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const navigate = useNavigate();

  const apiCards = [
    { name: "Access Token API", id: "accessToken" },
    { name: "Sales Data API", id: "salesData" },
    { name: "Service Info API", id: "serviceInfo" },
    { name: "Adhoc API", id: "adhocInfo" },
    { name: "Encryption & Decryption API", id: "security" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleApiClick = (apiId) => {
    navigate(`/api-details?api=${apiId}`);
  };

  const openAuthPopup = (mode) => {
    setAuthMode(mode);
    setShowAuthPopup(true);
  };

  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        {/* Navbar */}
        <div className="navbar">
          <div className="nav-left">
            <img src="/assets/bajaj-logo2.png" alt="Logo" className="logo" />
          </div>
          <div className="nav-right">
            <a href="/">Home</a>
            <a href="#available-apis">Explore APIs</a>
            <a href="#sandbox">Sandbox</a>
            <button className="nav-btn" onClick={() => openAuthPopup("signin")}>Sign In</button>
            <button className="nav-btn" onClick={() => openAuthPopup("signup")}>Sign Up</button>
          </div>
        </div>

        {/* Background Image */}
        <div className="bike-container">
          <img
            src={images[currentImageIndex]}
            alt="Sliding Bike"
            className="bike-image"
          />
        </div>

        {/* Tagline */}
        <div className="tagline">
          Fuel Your Innovation! <span>Ride with Smart APIs..</span>
        </div>

        {/* CTA Button */}
        <div className="cta-section">
          <button className="discover-btn" onClick={() => navigate("#available-apis")}>
            Discover APIs
          </button>
        </div>
      </div>

      {/* Available APIs Section */}
      <div id="available-apis" className="available-apis-section">
        <h2 className="apis-title">Available APIs</h2>
        <div className="available-api-cards">
          {apiCards.map((api) => (
            <div
              key={api.id}
              className="available-api-card"
              onClick={() => handleApiClick(api.id)}
            >
              <div className="api-blur-card">
                <h3>{api.name}</h3>
                <p>Tap to explore</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="feedback-section">
        <h2>Your Feedback</h2>
        <p>Tell us how we can take this ride to the next level.</p>
        <form className="feedback-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Feedback..." rows="4" required></textarea>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>

      {/* Auth Popup */}
      {showAuthPopup && (
        <div className="popup-overlay" onClick={() => setShowAuthPopup(false)}>
          <div className="popup-container auth-popup-container" onClick={(e) => e.stopPropagation()}>
            <h2>{authMode === "signin" ? "Sign In" : "Sign Up"}</h2>
            <form className="auth-form">
              <input type="text" placeholder="Username or Email" className="auth-input" required />
              {authMode === "signup" && (
                <input type="text" placeholder="Full Name" className="auth-input" required />
              )}
              <input type="password" placeholder="Password" className="auth-input" required />
              <button type="submit" className="auth-submit">
                {authMode === "signin" ? "Login" : "Register"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
