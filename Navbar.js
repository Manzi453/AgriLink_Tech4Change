import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/home" className="logo">
            {t('appName')}
          </Link>
          
        </div>
        
        <div className="navbar-right">
          <LanguageSwitcher />
          <div className="auth-buttons">
            <Link to="/auth" className="login-btn">{t('login')}</Link>
            <Link to="/signup" className="signup-btn">{t('signupLabel')}</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;