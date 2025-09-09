import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);

  const API_URL = 'https://agrilink-backend-production.up.railway.app';

  // Mock users data based on our database
  const [users] = useState([
    {
      id: 1,
      name: 'laura',
      email: 'example@grr.la',
      role: 'Farmer',
      status: 'Active',
      joinDate: '2025-07-27',
      location: 'Kigali, Rwanda'
    },
    {
      id: 2,
      name: 'Musana',
      email: 'musana@grr.la',
      role: 'Farmer',
      status: 'Active',
      joinDate: '2025-07-27',
      location: 'Huye, Rwanda'
    },
    {
      id: 3,
      name: 'Delucie',
      email: 'delucie@grr.la',
      role: 'Client',
      status: 'Active',
      joinDate: '2025-07-27',
      location: 'Musanze, Rwanda'
    },
    {
      id: 4,
      name: 'Nehemie',
      email: 'nehemie@grr.la',
      role: 'Admin',
      status: 'Active',
      joinDate: '2025-07-27',
      location: 'Kigali, Rwanda'
    },
    {
      id: 5,
      name: 'User',
      email: 'user@grr.la',
      role: 'Farmer',
      status: 'Pending',
      joinDate: '2025-07-27',
      location: 'Rubavu, Rwanda'
    }
  ]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/agriConnect/admin/membership-applications`, {
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
      await axios.post(`${API_URL}/agriConnect/admin/approve-membership?applicationId=${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchApplications(); // Refresh list
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  // Mock functions for user management
  const handleEditUser = (userId) => {
    console.log('Edit user:', userId);
    // Add edit user functionality here
  };

  const handleDeleteUser = (userId) => {
    console.log('Delete user:', userId);
    // Add delete user functionality here
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-profile">
          <div className="sidebar-profile-info">
            <h4>Admin Panel</h4>
          </div>
        </div>
        <ul>
          <li>
            <a href="#applications" onClick={() => setActiveTab('applications')} className={activeTab === 'applications' ? 'active' : ''}>
              Membership Applications
            </a>
          </li>
          <li>
            <a href="#users" onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>
              {t('dashboard.manageUsers')}
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
            <h2>Membership Applications</h2>
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>{t('name')}</th>
                    <th>{t('email')}</th>
                    <th>{t('phone')}</th>
                    <th>{t('location')}</th>
                    <th>{t('status')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td>{app.user?.fullName}</td>
                      <td>{app.user?.email}</td>
                      <td>{app.user?.phoneNumber}</td>
                      <td>{app.user?.location}</td>
                      <td>
                        <span className={`status-badge ${app.status.toLowerCase()}`}>
                          {app.status}
                        </span>
                      </td>
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

        {activeTab === 'users' && (
          <div className="admin-section">
            <h2>Manage Users</h2>
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role.toLowerCase()}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.location}</td>
                      <td>{user.joinDate}</td>
                      <td>
                        <motion.button
                          className="edit-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditUser(user.id)}
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          className="delete-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="admin-section">
            <h2>Platform Analytics</h2>
            <div className="analytics-grid">
              <motion.div
                className="analytics-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3>Total Users</h3>
                <p className="stat">{users.length}</p>
                <p className="stat-description">Registered users</p>
              </motion.div>

              <motion.div
                className="analytics-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3>Active Farmers</h3>
                <p className="stat">{users.filter(u => u.role === 'Farmer').length}</p>
                <p className="stat-description">Registered farmers</p>
              </motion.div>

              <motion.div
                className="analytics-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3>Pending Applications</h3>
                <p className="stat">
                  {applications.filter(app => app.status === 'PENDING').length}
                </p>
                <p className="stat-description">Awaiting approval</p>
              </motion.div>

              <motion.div
                className="analytics-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3>Monthly Revenue</h3>
                <p className="stat">RWF 2,450,000</p>
                <p className="stat-description">Platform transactions</p>
              </motion.div>

              <motion.div
                className="analytics-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3>New Users (Today)</h3>
                <p className="stat">3</p>
                <p className="stat-description">Registration today</p>
              </motion.div>

              <motion.div
                className="analytics-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3>Active Clients</h3>
                <p className="stat">{users.filter(u => u.role === 'Client').length}</p>
                <p className="stat-description">Registered clients</p>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-section {
          margin-bottom: 2rem;
        }

        .admin-section h2 {
          margin-bottom: 1.5rem;
          color: #374151;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .admin-table {
          background: #1f2937;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .admin-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th,
        .admin-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #374151;
        }

        .admin-table th {
          background: #1f2937;
          font-weight: 600;
          color: #22c55e;
          font-size: 0.875rem;
          text-transform: lowercase;
          letter-spacing: 0.05em;
        }

        .admin-table td {
          color: #e5e7eb;
        }

        .admin-table tr:hover {
          background: #374151;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .status-badge.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-badge.approved,
        .status-badge.active {
          background: #d1fae5;
          color: #065f46;
        }

        .role-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .role-badge.farmer {
          background: #dbeafe;
          color: #1e40af;
        }

        .role-badge.client {
          background: #e0e7ff;
          color: #5b21b6;
        }

        .role-badge.admin {
          background: #fce7f3;
          color: #be185d;
        }

        .approve-btn,
        .edit-btn {
          background: #22c55e;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          cursor: pointer;
          margin-right: 0.5rem;
          transition: background-color 0.2s;
        }

        .approve-btn:hover,
        .edit-btn:hover {
          background: #16a34a;
        }

        .delete-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          cursor: pointer;
          margin-right: 0.5rem;
          transition: background-color 0.2s;
        }

        .delete-btn:hover {
          background: #dc2626;
        }

        .approved-label {
          color: #065f46;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .analytics-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #22c55e;
        }

        .analytics-card h3 {
          margin: 0 0 1rem 0;
          color: #374151;
          font-size: 1rem;
          font-weight: 600;
        }

        .analytics-card .stat {
          font-size: 2rem;
          font-weight: 700;
          color: #22c55e;
          margin: 0;
          line-height: 1;
        }

        .analytics-card .stat-description {
          margin: 0.5rem 0 0 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .admin-table {
            overflow-x: auto;
          }

          .admin-table table {
            min-width: 600px;
          }

          .analytics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default AdminDashboard;