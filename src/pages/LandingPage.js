import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [showPopup, setShowPopup] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.state?.openPopup) {
      setShowPopup(true);
    }
  }, [location.state]);

  // ✅ Scroll-lock only when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopup]);

  // ✅ Proper scroll release on API click
  const handleApiClick = (apiId) => {
    setShowPopup(false); // Close the popup
    document.body.style.overflow = "auto"; // Re-enable scroll
    navigate(`/api-details?api=${apiId}`);
  };

  const openAuthPopup = (mode) => {
    setAuthMode(mode);
    setShowAuthPopup(true);
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-left">
          <img src="/assets/bajaj-logo2.png" alt="Logo" className="logo" />
        </div>
        <div className="nav-right">
          <a href="/">Home</a>
          <a href="#!" onClick={() => setShowPopup(true)}>Explore APIs</a>
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
        <button className="catalogue-button" onClick={() => setShowPopup(true)}>
          Discover APIs
        </button>
      </div>

      {/* API Catalogue Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <h2>API Catalogue</h2>
            <div className="popup-cards">
              {apiCards.map((api) => (
                <div
                  key={api.id}
                  className="popup-card"
                  onClick={() => handleApiClick(api.id)}
                >
                  {api.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
