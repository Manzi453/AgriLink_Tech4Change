import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        'https://agrilink-backend-production.up.railway.app/agriConnect/admin/membership-applications',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const approveApplication = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `https://agrilink-backend-production.up.railway.app/agriConnect/admin/approve-membership?applicationId=${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
      console.error('Error approving application:', err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-container">
      <div className="dashboard-sidebar">
        <ul>
          <li><a href="#applications" onClick={() => setActiveTab('applications')} className={activeTab === 'applications' ? 'active' : ''}>Membership Applications</a></li>
          <li><a href="#users" onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>Manage Users</a></li>
          <li><a href="#products" onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'active' : ''}>Manage Products</a></li>
          <li><a href="#analytics" onClick={() => setActiveTab('analytics')} className={activeTab === 'analytics' ? 'active' : ''}>Analytics</a></li>
        </ul>
      </div>

      <div className="dashboard-main">
        <h1>Admin Dashboard</h1>

        {activeTab === 'applications' && (
          <div className="admin-section">
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
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
                            onClick={() => approveApplication(app.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Approve
                          </motion.button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-grid">
            <motion.div className="analytics-card" whileHover={{ scale: 1.03 }}>
              <h3>Total Users</h3>
              <p className="stat">1,248</p>
            </motion.div>
            <motion.div className="analytics-card" whileHover={{ scale: 1.03 }}>
              <h3>Active Products</h3>
              <p className="stat">586</p>
            </motion.div>
            <motion.div className="analytics-card" whileHover={{ scale: 1.03 }}>
              <h3>Monthly Sales</h3>
              <p className="stat">RWF 12,450,000</p>
            </motion.div>
            <motion.div className="analytics-card" whileHover={{ scale: 1.03 }}>
              <h3>Pending Approvals</h3>
              <p className="stat">24</p>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;