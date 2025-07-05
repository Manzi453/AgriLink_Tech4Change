import React from 'react';
// import './Dashboard.css'; // REMOVED

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>AGRICONNECT</h2>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#settings">Settings</a></li>
          <li><a href="#mycrops">My Crops</a></li>
          <li><a href="#messages">Messages</a></li>
          <li><a href="#reports">Reports</a></li>
          <li><a href="#logout">Logout</a></li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Welcome, Farmer John</h1>
        <div className="product-grid">
          <div className="product-card">
            <img src="/maize.jpg" alt="Maize" /> {/* Placeholder image - ensure these are in public folder */}
            <h3>Maize</h3>
            <p>30 Kg available</p>
            <p>Price: 200 RWF/kg</p>
          </div>
          <div className="product-card">
            <img src="/beans.jpg" alt="Beans" /> {/* Placeholder image */}
            <h3>Beans</h3>
            <p>10 Kg available</p>
            <p>Price: 450 RWF/kg</p>
          </div>
          <div className="product-card">
            <img src="/potatoes.jpg" alt="Potatoes" /> {/* Placeholder image */}
            <h3>Potatoes</h3>
            <p>25 Kg available</p>
            <p>Price: 250 RWF/kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;