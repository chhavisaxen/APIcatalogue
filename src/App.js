import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

import ApiDetails from "./pages/ApiDetails";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage setShowPopup={setShowPopup} showPopup={showPopup} />} />
        <Route path="/api-details" element={<ApiDetails setShowPopup={setShowPopup} />} />
        
      </Routes>
    </Router>
  );
}

export default App;
