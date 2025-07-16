import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// AuthPage component for user login
const AuthPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  // adding animations on page 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <motion.div 
        className="dark-card"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <h1>{t('auth.title')}</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{t('auth.loginButton')}</button>
        </form>
        <p className="form-footer">
          {t('auth.noAccount')} <Link to="/signup">{t('auth.createAccount')}</Link>
        </p>
        <p className="form-footer">
          {t('auth.farmerQuestion')} <Link to="/membership">{t('auth.requestMembership')}</Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;