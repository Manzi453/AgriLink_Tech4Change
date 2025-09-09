import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Play, Pause } from 'lucide-react';

import maizeImage from './images/maize.jpg';
import beansImage from './images/beans.jpg';
import potatoesImage from './images/potatoes.jpg';
import defaultCropImage from './images/maize.jpg';

function Dashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample products data with published status
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Maize",
      image: maizeImage,
      quantity: "30",
      price: "200",
      farmer: "NYIRASAFARI",
      published: true
    },
    {
      id: 2,
      name: "Beans",
      image: beansImage,
      quantity: "10",
      price: "450",
      farmer: "",
      published: false
    },
    {
      id: 3,
      name: "Potatoes",
      image: potatoesImage,
      quantity: "25",
      price: "250",
      farmer: "EMMANUEL",
      published: true
    }
  ]);

  // Enhanced community chat states
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Jane Smith',
      content: 'Has anyone tried the new organic fertilizer? I heard great things about it.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isCurrentUser: false,
      type: 'text',
      avatar: 'JS'
    },
    {
      id: 2,
      sender: 'Manzi',
      content: 'Yes! It increased my maize yield by 20%. Definitely worth trying!',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isCurrentUser: true,
      type: 'text',
      avatar: 'M'
    },
    {
      id: 3,
      sender: 'Robert Johnson',
      content: 'Where can I buy it? Is it available locally?',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      isCurrentUser: false,
      type: 'text',
      avatar: 'RJ'
    },
    {
      id: 4,
      sender: 'Grace Uwimana',
      content: null,
      timestamp: new Date(Date.now() - 600000).toISOString(),
      isCurrentUser: false,
      type: 'voice',
      avatar: 'GU',
      duration: '0:45'
    },
    {
      id: 5,
      sender: 'Emmanuel Nkurunziza',
      content: 'I sell it at my agricultural store in Kigali. Good quality and fair prices.',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      isCurrentUser: false,
      type: 'text',
      avatar: 'EN'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [playingVoiceNote, setPlayingVoiceNote] = useState(null);
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
      sender: "Manzi",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
      type: 'text',
      avatar: 'M'
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log('Starting voice recording...');
    } else {
      console.log('Stopping voice recording...');
    }
  };

  const toggleVoiceNote = (messageId) => {
    if (playingVoiceNote === messageId) {
      setPlayingVoiceNote(null);
      console.log('Pausing voice note');
    } else {
      setPlayingVoiceNote(messageId);
      console.log('Playing voice note:', messageId);
    }
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
            <h4>Manzi</h4>
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
        </ul>
      </div>

      <div className="dashboard-main">
        {activeTab === 'dashboard' && (
          <>
            <h1>Hello Manzi</h1>
            <div className="product-feed">
              {products.filter(p => p.published).map(product => (
                <motion.div
                  className="product-card"
                  key={product.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="product-image-container">
                    <img
                      src={product.image || defaultCropImage}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultCropImage;
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{t('dashboard.available')}: {product.quantity} {t('units.kg')}</p>
                    <p>{t('units.rwfPerKg')}: {product.price}</p>
                    <p className="farmer-name">{product.farmer}</p>
                  </div>
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
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultCropImage;
                        }}
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
                    <div className="product-image-container">
                      <img
                        src={product.image || defaultCropImage}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultCropImage;
                        }}
                      />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p>{t('dashboard.available')}: {product.quantity} {t('units.kg')}</p>
                      <p>{t('units.rwfPerKg')}: {product.price}</p>
                    </div>
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
            {/* Enhanced Chat Header */}
            <div className="chat-header">
              <h2>Farmer Community</h2>
              <p>Share knowledge, ask questions, and connect with fellow farmers</p>
            </div>

            {/* Enhanced Messages Area */}
            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.isCurrentUser ? 'own-message' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-avatar">
                    {message.avatar}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="sender-name">{message.sender}</span>
                      <span className="message-time">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {message.type === 'text' ? (
                      <div className="message-text">{message.content}</div>
                    ) : (
                      <div className="voice-message">
                        <button
                          className="voice-play-btn"
                          onClick={() => toggleVoiceNote(message.id)}
                        >
                          {playingVoiceNote === message.id ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        <div className="voice-wave">
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                        </div>
                        <span className="voice-duration">{message.duration}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Message Input */}
            <div className="message-input-container">
              <div className="input-wrapper">
                <textarea
                  value={newMessage}
                  onChange={handleMessageChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts with the community..."
                  className="message-input"
                  rows="1"
                />
                <div className="input-actions">
                  <button
                    onClick={toggleRecording}
                    className={`voice-btn ${isRecording ? 'recording' : ''}`}
                    title={isRecording ? 'Stop recording' : 'Record voice note'}
                    type="button"
                  >
                    {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="send-btn"
                    title="Send message"
                    type="button"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
              {isRecording && (
                <div className="recording-indicator">
                  <div className="recording-dot"></div>
                  <span>Recording voice note...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Enhanced Community Chat Styles */
        .community-chat-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 160px);
          background: #f8f9fa;
          border-radius: 12px;
          overflow: hidden;
        }

        .chat-header {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: white;
          padding: 1.5rem;
          text-align: center;
        }

        .chat-header h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .chat-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .own-message {
          flex-direction: row-reverse;
        }

        .own-message .message-content {
          background: #22c55e;
          color: white;
        }

        .message-avatar {
          width: 40px;
          height: 40px;
          background: #e5e7eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.8rem;
          color: #374151;
          flex-shrink: 0;
        }

        .message-content {
          background: white;
          border-radius: 1rem;
          padding: 0.75rem 1rem;
          max-width: 70%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .sender-name {
          font-weight: 600;
          font-size: 0.85rem;
          color: #374151;
        }

        .own-message .sender-name {
          color: rgba(255, 255, 255, 0.9);
        }

        .message-time {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .own-message .message-time {
          color: rgba(255, 255, 255, 0.7);
        }

        .message-text {
          font-size: 0.9rem;
          line-height: 1.4;
          color: #374151;
        }

        .own-message .message-text {
          color: white;
        }

        .voice-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0;
        }

        .voice-play-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f3f4f6;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .voice-play-btn:hover {
          background: #e5e7eb;
        }

        .own-message .voice-play-btn {
          background: rgba(255, 255, 255, 0.2);
        }

        .own-message .voice-play-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .voice-wave {
          display: flex;
          gap: 2px;
          align-items: center;
          flex: 1;
        }

        .wave-bar {
          width: 3px;
          height: 16px;
          background: #d1d5db;
          border-radius: 2px;
          animation: wave 1.5s ease-in-out infinite;
        }

        .wave-bar:nth-child(2) { animation-delay: 0.2s; }
        .wave-bar:nth-child(3) { animation-delay: 0.4s; }
        .wave-bar:nth-child(4) { animation-delay: 0.6s; }
        .wave-bar:nth-child(5) { animation-delay: 0.8s; }

        .own-message .wave-bar {
          background: rgba(255, 255, 255, 0.6);
        }

        .voice-duration {
          font-size: 0.8rem;
          color: #6b7280;
          white-space: nowrap;
        }

        .own-message .voice-duration {
          color: rgba(255, 255, 255, 0.8);
        }

        @keyframes wave {
          0%, 100% { height: 8px; }
          50% { height: 20px; }
        }

        .message-input-container {
          background: white;
          border-top: 1px solid #e5e7eb;
          padding: 1rem;
        }

        .input-wrapper {
          display: flex;
          gap: 0.5rem;
          align-items: flex-end;
        }

        .message-input {
          flex: 1;
          border: 1px solid #d1d5db;
          border-radius: 1.5rem;
          padding: 0.75rem 1rem;
          resize: none;
          font-size: 0.9rem;
          min-height: 44px;
          max-height: 120px;
          outline: none;
          transition: border-color 0.2s;
        }

        .message-input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }

        .input-actions {
          display: flex;
          gap: 0.5rem;
        }

        .voice-btn, .send-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .voice-btn {
          background: #f3f4f6;
          color: #6b7280;
        }

        .voice-btn:hover {
          background: #e5e7eb;
        }

        .voice-btn.recording {
          background: #ef4444;
          color: white;
          animation: pulse 1s infinite;
        }

        .send-btn {
          background: #22c55e;
          color: white;
        }

        .send-btn:hover:not(:disabled) {
          background: #16a34a;
        }

        .send-btn:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .recording-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          color: #ef4444;
          font-size: 0.85rem;
        }

        .recording-dot {
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </motion.div>
  );
}

export default Dashboard;