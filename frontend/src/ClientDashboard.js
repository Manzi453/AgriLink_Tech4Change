import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ClientDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('market');
  
  const [profile] = useState({
    name: 'Client User',
    email: 'client@example.com',
    photo: '/images/default-profile.jpg'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard-container"
    >
      <div className="dashboard-sidebar">
        <div className="sidebar-profile">
          <img src={profile.photo} alt="Profile" className="sidebar-profile-photo" />
          <div className="sidebar-profile-info">
            <h4>{profile.name}</h4>
            <p>{profile.email}</p>
          </div>
        </div>
        <ul>
          <li>
            <a 
              href="#market" 
              onClick={() => setActiveTab('market')} 
              className={activeTab === 'market' ? 'active' : ''}
            >
              {t('dashboard.market')}
            </a>
          </li>
          <li>
            <a 
              href="#orders" 
              onClick={() => setActiveTab('orders')} 
              className={activeTab === 'orders' ? 'active' : ''}
            >
              {t('dashboard.orderHistory')}
            </a>
          </li>
          <li>
            <a 
              href="#favorites" 
              onClick={() => setActiveTab('favorites')} 
              className={activeTab === 'favorites' ? 'active' : ''}
            >
              {t('dashboard.favorites')}
            </a>
          </li>
          <li>
            <a 
              href="#payment" 
              onClick={() => setActiveTab('payment')} 
              className={activeTab === 'payment' ? 'active' : ''}
            >
              {t('dashboard.payment')}
            </a>
          </li>
          <li>
            <a href="#settings">{t('dashboard.settings')}</a>
          </li>
          <li>
            <a href="#logout">{t('dashboard.logout')}</a>
          </li>
        </ul>
      </div>

      <div className="dashboard-main">
        <h1>{t('dashboard.clientDashboard')}</h1>
        
        {activeTab === 'market' && (
          <div className="product-feed">
            {/* Sample product cards would go here */}
            <motion.div 
              className="product-card"
              whileHover={{ scale: 1.03 }}
            >
              <img src="/images/maize.jpg" alt="Maize" />
              <h3>Maize</h3>
              <p>{t('dashboard.available')}: 30 {t('units.kg')}</p>
              <p>{t('units.rwfPerKg')}: 200</p>
              <p className="farmer-name">John Doe</p>
            </motion.div>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="client-section">
            <h2>{t('dashboard.orderHistory')}</h2>
            <div className="placeholder-content">
              {/* Order history content would go here */}
            </div>
          </div>
        )}
        
        {activeTab === 'favorites' && (
          <div className="client-section">
            <h2>{t('dashboard.favorites')}</h2>
            <div className="placeholder-content">
              {/* Favorites content would go here */}
            </div>
          </div>
        )}
        
        {activeTab === 'payment' && (
          <div className="client-section">
            <h2>{t('dashboard.payment')}</h2>
            <div className="placeholder-content">
              {/* Payment content would go here */}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ClientDashboard;