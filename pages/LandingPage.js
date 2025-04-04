import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openPopup) {
      setShowPopup(true);
    }
  }, [location.state]);

  const apiCards = [
    { name: "Access Token API", id: "accessToken" },
    { name: "Sales Data API", id: "salesData" },
    { name: "Service Info API", id: "serviceInfo" },
    { name: "Adhoc API", id: "adhocInfo" },
    { name: "Encryption & Decryption API", id: "security" }
  ];

  const handleApiClick = (apiId) => {
    navigate(`/api-details?api=${apiId}`);
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-left">
          <img src="/assets/Frame.jpg" alt="Company Logo" className="logo" />
        </div>
      </div>

      <div className="bike-container">
        <img src="/assets/Frame1244836564.jpg" alt="Bike" className="bike-image" />
      </div>

      <div className="cta-section">
        <button className="catalogue-button" onClick={() => setShowPopup(true)}>VIEW API</button>
      </div>

      {/* Popup for API Cards */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <h2>API Catalogue</h2>
            <div className="popup-cards">
              {apiCards.map((api) => (
                <div key={api.id} className="popup-card" onClick={() => handleApiClick(api.id)}>
                  {api.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
