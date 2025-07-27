import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const AuthPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://agrilink-backend-production.up.railway.app/agriConnect/auth/login', formData);
      const data = response.data;
      localStorage.setItem('token', data.token);
      if (data.userType === 'FARMER') navigate('/farmer-dashboard');
      else if (data.userType === 'CITIZEN') navigate('/client-dashboard');
      else if (data.userType === 'ADMIN') navigate('/admin-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <motion.div className="auth-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="auth-background"></div>
      <motion.div className="auth-card" initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        <h1>{t('auth.loginTitle')}</h1>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder={t('auth.emailPlaceholder')} value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder={t('auth.passwordPlaceholder')} value={formData.password} onChange={handleChange} required />
          <button type="submit">{t('auth.loginButton')}</button>
        </form>
        <p>{t('auth.noAccount')} <Link to="/signup">{t('auth.signupLink')}</Link></p>
      </motion.div>
    </motion.div>
  );
};;
export default AuthPage;
