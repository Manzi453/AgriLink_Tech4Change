import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User } from 'lucide-react';
import Navbar from './Navbar';

import maizeImage from './images/maize.jpg';
import beansImage from './images/beans.jpg';
import potatoesImage from './images/potatoes.jpg';

const HomePage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showContactPopup, setShowContactPopup] = useState(false);

  useEffect(() => {
    const publishedProducts = [
      {
        id: 1,
        name: "Maize",
        image: maizeImage,
        farmer: "John Musana",
        phone: "+250 78 123 4567",
        price: "200",
        published: true
      },
      {
        id: 2,
        name: "Beans",
        image: beansImage,
        farmer: "Jane Uwimana",
        phone: "+250 78 987 6543",
        price: "450",
        published: true
      },
      {
        id: 3,
        name: "Potatoes",
        image: potatoesImage,
        farmer: "Robert Nkurunziza",
        phone: "+250 78 555 1212",
        price: "250",
        published: true
      }
    ].filter(p => p.published);

    setProducts(publishedProducts);
  }, []);

  const handleBuyNowClick = (product) => {
    setSelectedFarmer({
      name: product.farmer,
      phone: product.phone,
      product: product.name
    });
    setShowContactPopup(true);
  };

  const closePopup = () => {
    setShowContactPopup(false);
    setSelectedFarmer(null);
  };

  const handleCallFarmer = () => {
    if (selectedFarmer?.phone) {
      window.open(`tel:${selectedFarmer.phone}`, '_self');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="home-container"
    >
      <Navbar />

      <div className="products-section">
        <h2>{t('home.featuredProducts')}</h2>
        <div className="product-grid">
          {products.map(product => (
            <motion.div
              className="product-card"
              key={product.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder-crop.jpg'
                  }}
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="farmer-name">{product.farmer}</p>
                <p className="product-phone">{product.phone}</p>
                <p className="product-price">{t('units.rwfPerKg')}: {product.price}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="buy-btn"
                onClick={() => handleBuyNowClick(product)}
              >
                {t('home.buyNow')}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Popup */}
      <AnimatePresence>
        {showContactPopup && selectedFarmer && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
          >
            <motion.div
              className="contact-popup"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-header">
                <h3>Contact Farmer</h3>
                <button className="close-btn" onClick={closePopup}>
                  <X size={24} />
                </button>
              </div>

              <div className="popup-content">
                <div className="product-info-popup">
                  <h4>Product: {selectedFarmer.product}</h4>
                </div>

                <div className="farmer-contact-info">
                  <div className="contact-item">
                    <User size={20} />
                    <div>
                      <span className="contact-label">Farmer Name:</span>
                      <span className="contact-value">{selectedFarmer.name}</span>
                    </div>
                  </div>

                  <div className="contact-item">
                    <Phone size={20} />
                    <div>
                      <span className="contact-label">Phone Number:</span>
                      <span className="contact-value">{selectedFarmer.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="popup-actions">
                  <motion.button
                    className="call-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCallFarmer}
                  >
                    <Phone size={18} />
                    Call Farmer
                  </motion.button>

                  <motion.button
                    className="close-popup-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closePopup}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="home-footer">
        <p>{t('home.footerText')}</p>
      </footer>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .contact-popup {
          background: white;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          max-width: 400px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .popup-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.5rem 0 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 1.5rem;
        }

        .popup-header h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: #6b7280;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .popup-content {
          padding: 0 1.5rem 1.5rem 1.5rem;
        }

        .product-info-popup {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .product-info-popup h4 {
          margin: 0;
          color: #166534;
          font-size: 1rem;
          font-weight: 600;
        }

        .farmer-contact-info {
          margin-bottom: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .contact-item:last-child {
          border-bottom: none;
        }

        .contact-item svg {
          color: #22c55e;
          flex-shrink: 0;
        }

        .contact-item div {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .contact-label {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        .contact-value {
          font-size: 1rem;
          color: #374151;
          font-weight: 600;
        }

        .popup-actions {
          display: flex;
          gap: 0.75rem;
          flex-direction: column;
        }

        .call-btn {
          background: #22c55e;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background-color 0.2s;
        }

        .call-btn:hover {
          background: #16a34a;
        }

        .close-popup-btn {
          background: #f3f4f6;
          color: #374151;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .close-popup-btn:hover {
          background: #e5e7eb;
        }

        @media (max-width: 640px) {
          .contact-popup {
            margin: 1rem;
            max-width: calc(100% - 2rem);
          }

          .popup-header {
            padding: 1rem 1rem 0 1rem;
          }

          .popup-content {
            padding: 0 1rem 1rem 1rem;
          }

          .popup-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default HomePage;