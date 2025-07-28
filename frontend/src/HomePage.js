import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

import maizeImage from './images/maize.jpg';
import beansImage from './images/beans.jpg';
import potatoesImage from './images/potatoes.jpg';

const HomePage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

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
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="buy-btn"
                >
                  {t('home.buyNow')}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      <footer className="home-footer">
        <p>{t('home.footerText')}</p>
      </footer>
    </motion.div>
  );
};

export default HomePage;