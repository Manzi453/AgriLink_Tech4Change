import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ClientDashboard = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard-container"
    >
      <div className="dashboard-main">
        <h1>{t('dashboard.clientDashboard')}</h1>
        
        <div className="client-features">
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.03 }}
          >
            <h3>{t('dashboard.orderHistory')}</h3>
            <p>{t('dashboard.viewPastOrders')}</p>
            <div className="placeholder-content"></div>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.03 }}
          >
            <h3>{t('dashboard.favorites')}</h3>
            <p>{t('dashboard.savedProducts')}</p>
            <div className="placeholder-content"></div>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.03 }}
          >
            <h3>{t('dashboard.market')}</h3>
            <p>{t('dashboard.browseProducts')}</p>
            <div className="placeholder-content"></div>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.03 }}
          >
            <h3>{t('dashboard.payment')}</h3>
            <p>{t('dashboard.managePayments')}</p>
            <div className="placeholder-content"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientDashboard;