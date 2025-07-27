import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  const fetchPendingApplications = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/membership-applications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setApplications(response.data);
    } catch (error) {
      console.error('Failed to fetch applications', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/approve-membership`, null, {
        params: { applicationId: id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setApplications(applications.filter(app => app.id !== id));
    } catch (error) {
      console.error('Approval failed', error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-profile-info">
          <h4>Admin User</h4>
          <p>admin@example.com</p>
        </div>
        <ul>
          <li>
            <a href="#applications" onClick={() => setActiveTab('applications')} className={activeTab === 'applications' ? 'active' : ''}>
              Membership Applications
            </a>
          </li>
          <li>
            <a href="#users" onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>
              Manage Users
            </a>
          </li>
          <li>
            <a href="#products" onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'active' : ''}>
              Manage Products
            </a>
          </li>
          <li>
            <a href="#analytics" onClick={() => setActiveTab('analytics')} className={activeTab === 'analytics' ? 'active' : ''}>
              Analytics
            </a>
          </li>
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
                      <td>{app.user?.fullName}</td>
                      <td>{app.user?.email}</td>
                      <td>{app.user?.phone}</td>
                      <td>{app.user?.location}</td>
                      <td>{app.status}</td>
                      <td>
                        {app.status === 'PENDING' && (
                          <motion.button
                            className="approve-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApprove(app.id)}
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
      </div>
    </motion.div>
  );
};

export default AdminDashboard;