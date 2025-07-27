import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);

  const API_URL = 'https://agrilink-backend-production.up.railway.app';

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/membership-applications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const approveApplication = async (id) => {
    try {
      await axios.post(`${API_URL}/admin/approve-membership?applicationId=${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchApplications(); // Refresh list
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

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
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td>{app.user?.fullName}</td>
                      <td>{app.user?.email}</td>
                      <td>{app.user?.phoneNumber}</td>
                      <td>{app.user?.location}</td>
                      <td>{app.status}</td>
                      <td>
                        {app.status === 'PENDING' ? (
                          <motion.button
                            className="approve-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => approveApplication(app.id)}
                          >
                            {t('dashboard.approve')}
                          </motion.button>
                        ) : (
                          <span className="approved-label">{t('dashboard.approved')}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs - placeholders */}
        {activeTab === 'users' && <p>{t('dashboard.manageUsers')} section</p>}
        {activeTab === 'products' && <p>{t('dashboard.manageProducts')} section</p>}
        {activeTab === 'analytics' && <p>{t('dashboard.analytics')} section</p>}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;