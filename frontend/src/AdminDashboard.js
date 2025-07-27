import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://agrilink-backend-production.up.railway.app/agriConnect/admin/membership-applications',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(response.data);
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `https://agrilink-backend-production.up.railway.app/agriConnect/admin/approve-membership?applicationId=${applicationId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications(); // refresh list
    } catch (error) {
      console.error('Approval failed', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [activeTab]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-container">
      <div className="dashboard-sidebar">
        <ul>
          <li>
            <a
              href="#applications"
              onClick={() => setActiveTab('applications')}
              className={activeTab === 'applications' ? 'active' : ''}
            >
              {t('dashboard.membershipApplications')}
            </a>
          </li>
        </ul>
      </div>

      <div className="dashboard-main">
        <h1>{t('dashboard.adminDashboard')}</h1>

        {activeTab === 'applications' && (
          <div className="admin-section">
            {loading ? (
              <p>{t('dashboard.loading')}</p>
            ) : (
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
                          {app.status === 'PENDING' && (
                            <motion.button
                              className="approve-btn"
                              onClick={() => handleApprove(app.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {t('dashboard.approve')}
                            </motion.button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
