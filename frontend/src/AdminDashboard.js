import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [activeTab]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://agrilink-backend-production.up.railway.app/agriConnect/admin/membership-applications',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `https://agrilink-backend-production.up.railway.app/agriConnect/admin/approve-membership?applicationId=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchApplications();
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-container">
      <div className="dashboard-sidebar">
        <ul>
          <li>
            <a href="#applications" onClick={() => setActiveTab('applications')} className={activeTab === 'applications' ? 'active' : ''}>
              {t('dashboard.membershipApplications')}
            </a>
          </li>
          <li>
            <a href="#users" onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>
              {t('dashboard.manageUsers')}
            </a>
          </li>
          <li>
            <a href="#products" onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'active' : ''}>
              {t('dashboard.manageProducts')}
            </a>
          </li>
          <li>
            <a href="#analytics" onClick={() => setActiveTab('analytics')} className={activeTab === 'analytics' ? 'active' : ''}>
              {t('dashboard.analytics')}
            </a>
          </li>
        </ul>
      </div>

      <div className="dashboard-main">
        <h1>{t('dashboard.adminDashboard')}</h1>

        {activeTab === 'applications' && (
          <div className="admin-section">
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>{t('dashboard.name')}</th>
                    <th>{t('dashboard.email')}</th>
                    <th>{t('dashboard.phone')}</th>
                    <th>{t('dashboard.location')}</th>
                    <th>{t('dashboard.status')}</th>
                    <th>{t('dashboard.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.user.fullName}</td>
                      <td>{app.user.email}</td>
                      <td>{app.user.phoneNumber}</td>
                      <td>{app.user.location}</td>
                      <td>{app.status}</td>
                      <td>
                        <motion.button
                          className="approve-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApprove(app.id)}
                        >
                          {t('dashboard.approve')}
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>{/* Render users list here */}</div>
        )}

        {activeTab === 'products' && (
          <div>{/* Render products list here */}</div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-grid">
            <motion.div className="analytics-card" whileHover={{ scale: 1.03 }}>
              <h3>{t('dashboard.totalUsers')}</h3>
              <p className="stat">1,248</p>
            </motion.div>
            <motion.div className="analytics-card" whileHover={{ scale: 1.03 }}>
              <h3>{t('dashboard.activeProducts')}</h3>
              <p className="stat">586</p>
            </motion.div>
            <motion.div className="analytics-card" whileHover={{ scale: 1.03 }}>
              <h3>{t('dashboard.monthlySales')}</h3>
              <p className="stat">RWF 12,450,000</p>
            </motion.div>
            <motion.div className="analytics-card" whileHover={{ scale: 1.03 }}>
              <h3>{t('dashboard.pendingApprovals')}</h3>
              <p className="stat">24</p>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;