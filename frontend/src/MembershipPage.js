import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const MembershipPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    location: '',
    farmName: '',
    cropTypes: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        type: 'FARMER'
      };

      await axios.post(
        'https://agrilink-backend-production.up.railway.app/agriConnect/public/apply/farmer',
        payload
      );

      alert(t('membership.submissionSuccess'));
      navigate('/auth');
    } catch (err) {
      setError(t('membership.submissionFailed'));
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
          <h1>{t('membership.title')}</h1>
          <p>{t('membership.subtitle')}</p>
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
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder={t('membership.fullName')}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={t('membership.email')}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder={t('membership.password')}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phoneNumber"
              placeholder={t('membership.phoneNumber')}
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="location"
              placeholder={t('membership.location')}
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="farmName"
              placeholder={t('membership.farmName')}
              value={formData.farmName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="cropTypes"
              placeholder={t('membership.cropTypes')}
              value={formData.cropTypes}
              onChange={handleChange}
              required
            />
          </div>

          <motion.button
            type="submit"
            className="auth-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('membership.submitButton')}
          </motion.button>
        </form>

        <div className="auth-footer">
          <div>
            {t('membership.haveAccount')}
            <button
              className="auth-switch"
              onClick={() => navigate('/auth')}
            >
              {t('membership.loginLink')}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MembershipPage;