import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLoginMode) {
      if (formData.password !== formData.confirmPassword) {
        setError(t('auth.passwordsDontMatch'));
        return;
      }
      if (formData.password.length < 6) {
        setError(t('auth.passwordLength'));
        return;
      }

      // TODO: implement signup logic
      return;
    }

    // LOGIN mode: Send credentials to backend
    try {
      const response = await fetch('https://agrilink-backend.railway.internal/agriConnect/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store role and optionally token
      localStorage.setItem('userRole', formData.role);
      // localStorage.setItem('token', data.token); // optional

      // Redirect by role
      switch (formData.role) {
        case 'farmer':
          navigate('/farmer-dashboard');
          break;
        case 'client':
          navigate('/client-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="auth-container"
    >
      <div className="auth-background"></div>

      <motion.div
        className="auth-card"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <div className="logo">AGRILINK</div>
          <h1>{isLoginMode ? t('auth.loginTitle') : t('auth.signupTitle')}</h1>
          <p>{isLoginMode ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}</p>
        </div>

        {error && (
          <motion.div
            className="auth-error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder={t('auth.fullName')}
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <div className="input-icon">
                <i className="fas fa-user"></i>
              </div>
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={t('auth.emailPlaceholder')}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="input-icon">
              <i className="fas fa-envelope"></i>
            </div>
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder={t('auth.passwordPlaceholder')}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="input-icon">
              <i className="fas fa-lock"></i>
            </div>
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder={t('auth.confirmPasswordPlaceholder')}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className="input-icon">
                <i className="fas fa-lock"></i>
              </div>
            </div>
          )}

          <div className="form-group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="farmer">{t('roles.farmer')}</option>
              <option value="client">{t('roles.client')}</option>
              <option value="admin">{t('roles.admin')}</option>
            </select>
          </div>

          <motion.button
            type="submit"
            className="auth-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoginMode ? t('auth.loginButton') : t('auth.signupButton')}
          </motion.button>
        </form>

        <div className="auth-footer">
          <div>
            {isLoginMode ? t('auth.noAccount') : t('auth.haveAccount')}
            <button
              className="auth-switch"
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode ? t('auth.signupLink') : t('auth.loginLink')}
            </button>
          </div>
          {isLoginMode && (
            <div className="farmer-membership-link">
              {t('auth.areYouFarmer')}{" "}
              <Link to="/membership" className="membership-link">
                {t('auth.requestMembership')}
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;