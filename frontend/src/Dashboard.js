// Dashboard.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

function Dashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Maize",
      image: "/images/maize.jpg",
      quantity: "30",
      price: "200",
      farmer: "John Doe"
    },
    {
      id: 2,
      name: "Beans",
      image: "/images/beans.jpg",
      quantity: "10",
      price: "450",
      farmer: "Jane Smith"
    },
    {
      id: 3,
      name: "Potatoes",
      image: "/images/potatoes.jpg",
      quantity: "25",
      price: "250",
      farmer: "Robert Johnson"
    }
  ]);

  // Settings states
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+250 78 123 4567',
    location: 'Kigali, Rwanda',
    photo: '/images/default-profile.jpg'
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    priceAlerts: true,
    newCropAlerts: true
  });
  
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [activeSetting, setActiveSetting] = useState('profile');
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: null,
    farmer: "Current User"
  });

  // Handler functions
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const photoUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, photo: photoUrl }));
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity(prev => ({ ...prev, [name]: value }));
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setNewProduct(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setShowProductForm(false);
    setNewProduct({
      name: "",
      quantity: "",
      price: "",
      image: null,
      farmer: "Current User"
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleSubmitSettings = (e, section) => {
    e.preventDefault();
    alert(`${section} settings updated successfully!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard-container"
    >
      <div className="dashboard-sidebar">
        <div className="sidebar-profile">
          <img src={profile.photo} alt="Profile" className="sidebar-profile-photo" />
          <div className="sidebar-profile-info">
            <h4>{profile.name}</h4>
            <p>{profile.email}</p>
          </div>
        </div>
        <ul>
          <li>
            <a 
              href="#dashboard" 
              onClick={() => setActiveTab('dashboard')} 
              className={activeTab === 'dashboard' ? 'active' : ''}
            >
              {t('dashboard.dashboard')}
            </a>
          </li>
          <li>
            <a 
              href="#mycrops" 
              onClick={() => {
                setActiveTab('mycrops');
                setShowProductForm(false);
              }} 
              className={activeTab === 'mycrops' ? 'active' : ''}
            >
              {t('dashboard.myCrops')}
            </a>
          </li>
          <li>
            <a 
              href="#settings" 
              onClick={() => setActiveTab('settings')} 
              className={activeTab === 'settings' ? 'active' : ''}
            >
              {t('dashboard.settings')}
            </a>
          </li>
          <li>
            <a href="#messages">
              {t('dashboard.messages')}
            </a>
          </li>
          <li>
            <a href="#reports">
              {t('dashboard.reports')}
            </a>
          </li>
          <li>
            <a href="#logout">
              {t('dashboard.logout')}
            </a>
          </li>
        </ul>
      </div>

      <div className="dashboard-main">
        {activeTab === 'dashboard' && (
          <>
            <h1>{t('dashboard.greeting')}</h1>
            <div className="product-feed">
              {products.map(product => (
                <motion.div 
                  className="product-card" 
                  key={product.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <img src={product.image || "/images/default-crop.jpg"} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{t('dashboard.available')}: {product.quantity} {t('units.kg')}</p>
                  <p>{t('units.rwfPerKg')}: {product.price}</p>
                  <p className="farmer-name">{product.farmer}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'mycrops' && (
          <>
            <div className="section-header">
              <h1>{t('dashboard.myCrops')}</h1>
              {!showProductForm && (
                <motion.button
                  className="welcome-btn"
                  onClick={() => setShowProductForm(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('dashboard.addCrop')}
                </motion.button>
              )}
            </div>

            {showProductForm ? (
              <motion.div
                className="product-form-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2>{t('dashboard.addCrop')}</h2>
                <form onSubmit={handleSubmitProduct}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder={t('dashboard.cropName')}
                      value={newProduct.name}
                      onChange={handleProductInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="number"
                      name="quantity"
                      placeholder={`${t('dashboard.quantity')} (${t('units.kg')})`}
                      value={newProduct.quantity}
                      onChange={handleProductInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="number"
                      name="price"
                      placeholder={`${t('dashboard.price')} (${t('units.rwfPerKg')})`}
                      value={newProduct.price}
                      onChange={handleProductInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>{t('dashboard.image')}</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {newProduct.image && (
                      <img 
                        src={newProduct.image} 
                        alt="Preview" 
                        className="image-preview"
                      />
                    )}
                  </div>
                  
                  <div className="form-actions">
                    <motion.button
                      type="submit"
                      className="welcome-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('dashboard.save')}
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      className="welcome-btn cancel-btn"
                      onClick={() => setShowProductForm(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('dashboard.cancel')}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <div className="product-grid">
                {products.filter(p => p.farmer === "Current User").map(product => (
                  <motion.div 
                    className="product-card" 
                    key={product.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={product.image || "/images/default-crop.jpg"} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{t('dashboard.available')}: {product.quantity} {t('units.kg')}</p>
                    <p>{t('units.rwfPerKg')}: {product.price}</p>
                    <div className="product-actions">
                      <motion.button 
                        className="edit-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('dashboard.edit')}
                      </motion.button>
                      <motion.button 
                        className="delete-button"
                        onClick={() => handleDeleteProduct(product.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('dashboard.delete')}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'settings' && (
          <div className="settings-container">
            <div className="settings-sidebar">
              <h3>{t('settings.settingsMenu')}</h3>
              <ul>
                <li 
                  className={activeSetting === 'profile' ? 'active' : ''}
                  onClick={() => setActiveSetting('profile')}
                >
                  {t('settings.profile')}
                </li>
                <li 
                  className={activeSetting === 'notifications' ? 'active' : ''}
                  onClick={() => setActiveSetting('notifications')}
                >
                  {t('settings.notifications')}
                </li>
                <li 
                  className={activeSetting === 'security' ? 'active' : ''}
                  onClick={() => setActiveSetting('security')}
                >
                  {t('settings.security')}
                </li>
                <li 
                  className={activeSetting === 'preferences' ? 'active' : ''}
                  onClick={() => setActiveSetting('preferences')}
                >
                  {t('settings.preferences')}
                </li>
              </ul>
            </div>

            <div className="settings-content">
              {activeSetting === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="settings-card"
                >
                  <h3>{t('settings.profile')}</h3>
                  <form onSubmit={(e) => handleSubmitSettings(e, 'profile')}>
                    <div className="profile-photo-section">
                      <div className="profile-photo-container">
                        <img 
                          src={profile.photo} 
                          alt="Profile" 
                          className="profile-photo"
                        />
                        <div className="photo-actions">
                          <label className="photo-upload-btn">
                            {t('settings.changePhoto')}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoChange}
                              style={{ display: 'none' }}
                            />
                          </label>
                          {profile.photo !== '/images/default-profile.jpg' && (
                            <button 
                              type="button" 
                              className="photo-remove-btn"
                              onClick={() => setProfile(prev => ({
                                ...prev,
                                photo: '/images/default-profile.jpg'
                              }))}
                            >
                              {t('settings.removePhoto')}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>{t('settings.fullName')}</label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('settings.email')}</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('settings.phone')}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('settings.location')}</label>
                      <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <button type="submit" className="save-btn">
                      {t('settings.updateProfile')}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeSetting === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="settings-card"
                >
                  <h3>{t('settings.notifications')}</h3>
                  <form onSubmit={(e) => handleSubmitSettings(e, 'notifications')}>
                    <div className="toggle-group">
                      <label>
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={notifications.emailNotifications}
                          onChange={handleNotificationChange}
                        />
                        <span>{t('settings.emailNotifications')}</span>
                      </label>
                    </div>
                    <div className="toggle-group">
                      <label>
                        <input
                          type="checkbox"
                          name="smsNotifications"
                          checked={notifications.smsNotifications}
                          onChange={handleNotificationChange}
                        />
                        <span>{t('settings.smsNotifications')}</span>
                      </label>
                    </div>
                    <div className="toggle-group">
                      <label>
                        <input
                          type="checkbox"
                          name="priceAlerts"
                          checked={notifications.priceAlerts}
                          onChange={handleNotificationChange}
                        />
                        <span>{t('settings.priceAlerts')}</span>
                      </label>
                    </div>
                    <div className="toggle-group">
                      <label>
                        <input
                          type="checkbox"
                          name="newCropAlerts"
                          checked={notifications.newCropAlerts}
                          onChange={handleNotificationChange}
                        />
                        <span>{t('settings.newCropAlerts')}</span>
                      </label>
                    </div>
                    <button type="submit" className="save-btn">
                      {t('settings.saveNotifications')}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeSetting === 'security' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="settings-card"
                >
                  <h3>{t('settings.security')}</h3>
                  <form onSubmit={(e) => handleSubmitSettings(e, 'security')}>
                    <div className="form-group">
                      <label>{t('settings.currentPassword')}</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={security.currentPassword}
                        onChange={handleSecurityChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('settings.newPassword')}</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={security.newPassword}
                        onChange={handleSecurityChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('settings.confirmPassword')}</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={security.confirmPassword}
                        onChange={handleSecurityChange}
                        required
                      />
                    </div>
                    <button type="submit" className="save-btn">
                      {t('settings.changePassword')}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeSetting === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="settings-card"
                >
                  <h3>{t('settings.preferences')}</h3>
                  <div className="preferences-grid">
                    <div className="preference-item">
                      <h4>{t('settings.language')}</h4>
                      <LanguageSwitcher />
                    </div>
                    <div className="preference-item">
                      <h4>{t('settings.theme')}</h4>
                      <div className="theme-options">
                        <button className="theme-light">Light</button>
                        <button className="theme-dark active">Dark</button>
                        <button className="theme-system">System</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;