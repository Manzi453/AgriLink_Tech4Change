import React from 'react';
import { Link } from 'react-router-dom';
// import './WelcomePage.css'; // REMOVED

function WelcomePage() {
  return (
    <div className="page-background welcome-page">
      <div className="welcome-content">
        <h1>AGRI CONNECT</h1>
        <h2>THE FUTURE BELONGS TO US WHO ARE WILLING TO GET OUR HANDS DIRTY</h2>
        <Link to="/auth" className="btn">GET STARTED</Link>
        {/* You might want an image here based on the design, e.g., a tractor SVG */}
        {/* <img src="/tractor.svg" alt="Tractor" className="welcome-image" /> */}
      </div>
    </div>
  );
}

export default WelcomePage;