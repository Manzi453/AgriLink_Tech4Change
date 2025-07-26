import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';


function Dashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample products data with published status
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Maize",
      image: "/images/maize.jpg",
      quantity: "30",
      price: "200",
      farmer: "John Doe",
      published: true
    },
    {
      id: 2,
      name: "Beans",
      image: "/images/beans.jpg",
      quantity: "10",
      price: "450",
      farmer: "Jane Smith",
      published: false
    },
    {
      id: 3,
      name: "Potatoes",
      image: "/images/potatoes.jpg",
      quantity: "25",
      price: "250",
      farmer: "Robert Johnson",
      published: true
    }
  ]);
  
  // Chat states
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Jane Smith',
      content: 'Has anyone tried the new organic fertilizer?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isCurrentUser: false
    },
    {
      id: 2,
      sender: 'John Doe',
      content: 'Yes! It increased my maize yield by 20%',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isCurrentUser: true
    },
    {
      id: 3,
      sender: 'Robert Johnson',
      content: 'Where can I buy it?',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      isCurrentUser: false
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: null,
    farmer: "Current User"
  });

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (activeTab === 'messages') {
      const messagesContainer = document.querySelector('.chat-messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [messages, activeTab]);

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
    setProducts([...products, { 
      ...newProduct, 
      id: newId,
      published: false
    }]);
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

  const handlePublishProduct = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, published: !product.published } 
        : product
    ));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: "Current User",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isCurrentUser: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard-container"
    >
      <div className="dashboard-sidebar">
        <div className="sidebar-profile">
          <div className="sidebar-profile-info">
            <h4>Current User</h4>
            <p>user@example.com</p>
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
              href="#messages" 
              onClick={() => setActiveTab('messages')} 
              className={activeTab === 'messages' ? 'active' : ''}
            >
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
            <h1>{t('dashboard.greeting')}, Current User!</h1>
            <div className="product-feed">
              {products.filter(p => p.published).map(product => (
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
                      <motion.button
                        className={`publish-button ${product.published ? '' : 'unpublished'}`}
                        onClick={() => handlePublishProduct(product.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {product.published ? t('dashboard.published') : t('dashboard.publish')}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'messages' && (
          <div className="community-chat-container">
            <div className="chat-header">
              <h2>{t('dashboard.messages')}</h2>
            </div>
            
            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.isCurrentUser ? 'sent' : 'received'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {!message.isCurrentUser && (
                    <div className="message-sender">{message.sender}</div>
                  )}
                  <div className="message-content">
                    <p>{message.content}</p>
                  </div>
                  <div className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={handleMessageChange}
                placeholder={t('dashboard.typeMessage')}
              />
              <button type="submit" disabled={!newMessage.trim()}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;