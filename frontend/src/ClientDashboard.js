import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import maizeImage from './images/maize.jpg';
import defaultProfile from './images/maize.jpg';

const ClientDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('market');

  const [profile] = useState({
    name: 'Nehemia',
    photo: defaultProfile
  });

  // Mock data for marketplace
  const mockProducts = [
    {
      id: 1,
      name: 'Maize',
      available: 30,
      pricePerKg: 200,
      farmer: 'EMMANUEL',
      image: maizeImage,
      location: 'Nyanza District',
      quality: 'Premium'
    },
    {
      id: 2,
      name: 'Rice',
      available: 25,
      pricePerKg: 350,
      farmer: 'MARIE',
      image: maizeImage, // placeholder
      location: 'Eastern Province',
      quality: 'Grade A'
    },
    {
      id: 3,
      name: 'Beans',
      available: 15,
      pricePerKg: 280,
      farmer: 'JOHN',
      image: maizeImage, // placeholder
      location: 'Western Province',
      quality: 'Organic'
    },
    {
      id: 4,
      name: 'Sweet Potatoes',
      available: 40,
      pricePerKg: 150,
      farmer: 'GRACE',
      image: maizeImage, // placeholder
      location: 'Northern Province',
      quality: 'Fresh'
    }
  ];

  // Mock data for liked/favorite products
  const mockFavorites = [
    {
      id: 1,
      name: 'Maize',
      farmer: 'EMMANUEL',
      lastPrice: 200,
      image: maizeImage,
      dateAdded: '2024-01-15'
    },
    {
      id: 3,
      name: 'Beans',
      farmer: 'JOHN',
      lastPrice: 280,
      image: maizeImage, // placeholder
      dateAdded: '2024-01-10'
    }
  ];

  // Mock data for recent orders/interactions
  const mockRecentActivity = [
    {
      id: 1,
      type: 'inquiry',
      product: 'Maize',
      farmer: 'EMMANUEL',
      date: '2024-01-20',
      status: 'pending_response'
    },
    {
      id: 2,
      type: 'favorite',
      product: 'Beans',
      farmer: 'JOHN',
      date: '2024-01-18',
      status: 'added'
    },
    {
      id: 3,
      type: 'inquiry',
      product: 'Rice',
      farmer: 'MARIE',
      date: '2024-01-15',
      status: 'responded'
    }
  ];

  const handleLikeProduct = (productId) => {
    // Mock function - in real app would update favorites
    console.log(`Added product ${productId} to favorites`);
  };

  const handleContactFarmer = (farmerName, product) => {
    // Mock function - in real app would open messaging
    console.log(`Opening message to ${farmerName} about ${product}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard-container"
    >
      <div className="dashboard-sidebar">
        <div className="sidebar-profile">
          <div className="sidebar-profile-info">
            <h4>{profile.name}</h4>
            <p>Client</p>
          </div>
        </div>
        <ul>
          <li>
            <a
              href="#market"
              onClick={() => setActiveTab('market')}
              className={activeTab === 'market' ? 'active' : ''}
            >
              {t('dashboard.market') || 'Marketplace'}
            </a>
          </li>
          <li>
            <a
              href="#favorites"
              onClick={() => setActiveTab('favorites')}
              className={activeTab === 'favorites' ? 'active' : ''}
            >
              {t('dashboard.favorites') || 'Favorite Products'}
            </a>
          </li>
          <li>
            <a
              href="#activity"
              onClick={() => setActiveTab('activity')}
              className={activeTab === 'activity' ? 'active' : ''}
            >
              Recent Activity
            </a>
          </li>
          <li>
            <a href="#logout">{t('dashboard.logout') || 'Logout'}</a>
          </li>
        </ul>
      </div>

      <div className="dashboard-main">
        <h1>{t('dashboard.clientDashboard') || 'Client Dashboard'}</h1>

        {activeTab === 'market' && (
          <div className="product-feed">
            <h2>Available Products</h2>
            <div className="products-grid">
              {mockProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder-crop.jpg';
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{t('dashboard.available') || 'Available'}: {product.available} {t('units.kg') || 'kg'}</p>
                    <p>{t('units.rwfPerKg') || 'RWF/kg'}: {product.pricePerKg}</p>
                    <p className="farmer-name">by {product.farmer}</p>
                    <p className="product-location">{product.location}</p>
                    <p className="product-quality">{product.quality}</p>
                    <div className="product-actions">
                      <button
                        className="btn-secondary"
                        onClick={() => handleLikeProduct(product.id)}
                      >
                        ❤️ Like
                      </button>
                      <button
                        className="btn-primary"
                        onClick={() => handleContactFarmer(product.farmer, product.name)}
                      >
                        💬 Contact
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="client-section">
            <h2>{t('dashboard.favorites') || 'Favorite Products'}</h2>
            {mockFavorites.length > 0 ? (
              <div className="favorites-grid">
                {mockFavorites.map((favorite) => (
                  <motion.div
                    key={favorite.id}
                    className="favorite-card"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="favorite-image-container">
                      <img
                        src={favorite.image}
                        alt={favorite.name}
                        className="favorite-image"
                      />
                    </div>
                    <div className="favorite-info">
                      <h4>{favorite.name}</h4>
                      <p>by {favorite.farmer}</p>
                      <p>Last seen: {favorite.lastPrice} RWF/kg</p>
                      <p className="date-added">Added: {favorite.dateAdded}</p>
                      <div className="favorite-actions">
                        <button
                          className="btn-primary"
                          onClick={() => handleContactFarmer(favorite.farmer, favorite.name)}
                        >
                          💬 Message Farmer
                        </button>
                        <button className="btn-secondary">
                          🔍 Check Availability
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="placeholder-content">
                <p>No favorite products yet. Browse the marketplace and like products to see them here!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="client-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'inquiry' ? '💬' : '❤️'}
                  </div>
                  <div className="activity-details">
                    <p>
                      <strong>
                        {activity.type === 'inquiry'
                          ? `Messaged ${activity.farmer} about ${activity.product}`
                          : `Added ${activity.product} to favorites`
                        }
                      </strong>
                    </p>
                    <p className="activity-date">{activity.date}</p>
                    <p className={`activity-status status-${activity.status}`}>
                      {activity.status === 'pending_response' && 'Waiting for response'}
                      {activity.status === 'responded' && 'Farmer responded'}
                      {activity.status === 'added' && 'Successfully added'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ClientDashboard;