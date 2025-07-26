import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('users');
  
  // Sample data
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Farmer', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Client', status: 'Active' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' }
  ]);
  
  const [products] = useState([
    { id: 1, name: 'Maize', farmer: 'John Doe', status: 'Approved' },
    { id: 2, name: 'Beans', farmer: 'Jane Smith', status: 'Pending' },
    { id: 3, name: 'Potatoes', farmer: 'Robert Johnson', status: 'Approved' }
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard-container"
    >
      <div className="dashboard-main">
        <h1>{t('dashboard.adminDashboard')}</h1>
        
        <div className="admin-tabs">
          <motion.button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
            whileHover={{ scale: 1.05 }}
          >
            {t('dashboard.manageUsers')}
          </motion.button>
          <motion.button
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
            whileHover={{ scale: 1.05 }}
          >
            {t('dashboard.manageProducts')}
          </motion.button>
          <motion.button
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
            whileHover={{ scale: 1.05 }}
          >
            {t('dashboard.analytics')}
          </motion.button>
        </div>
        
        {activeTab === 'users' && (
          <div className="admin-section">
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>{t('dashboard.name')}</th>
                    <th>{t('dashboard.email')}</th>
                    <th>{t('dashboard.role')}</th>
                    <th>{t('dashboard.status')}</th>
                    <th>{t('dashboard.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td>
                        <button className="edit-btn">{t('dashboard.edit')}</button>
                        <button className="delete-btn">{t('dashboard.delete')}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'products' && (
          <div className="admin-section">
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>{t('dashboard.product')}</th>
                    <th>{t('dashboard.farmer')}</th>
                    <th>{t('dashboard.status')}</th>
                    <th>{t('dashboard.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.farmer}</td>
                      <td>{product.status}</td>
                      <td>
                        {product.status === 'Pending' && (
                          <>
                            <button className="approve-btn">{t('dashboard.approve')}</button>
                            <button className="reject-btn">{t('dashboard.reject')}</button>
                          </>
                        )}
                        <button className="view-btn">{t('dashboard.view')}</button>
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
            <div className="analytics-grid">
              <motion.div 
                className="analytics-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3>{t('dashboard.totalUsers')}</h3>
                <p className="stat">1,248</p>
              </motion.div>
              <motion.div 
                className="analytics-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3>{t('dashboard.activeProducts')}</h3>
                <p className="stat">586</p>
              </motion.div>
              <motion.div 
                className="analytics-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3>{t('dashboard.monthlySales')}</h3>
                <p className="stat">RWF 12,450,000</p>
              </motion.div>
              <motion.div 
                className="analytics-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3>{t('dashboard.pendingApprovals')}</h3>
                <p className="stat">24</p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;