import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="welcome-container"
    >
      <div className="language-switcher-container">
        <LanguageSwitcher />
      </div>

      <motion.div
        className="welcome-content"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <h1>{t('welcome')}</h1>
        <p className="subtitle">{t('home.subtitle')}</p>

        <motion.div
          className="welcome-button-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/home">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="get-started-btn"
            >
              {t('home.getStarted')}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage;