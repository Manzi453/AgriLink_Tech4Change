import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const HomePage = () => {
  const { t } = useTranslation();
  
  // Sample products data
  const products = [
    {
      id: 1,
      name: "Maize",
      image: "/images/maize.jpg",
      farmer: "John Doe",
      phone: "+250 78 123 4567",
      price: "200"
    },
    {
      id: 2,
      name: "Beans",
      image: "/images/beans.jpg",
      farmer: "Jane Smith",
      phone: "+250 78 987 6543",
      price: "450"
    },
    {
      id: 3,
      name: "Potatoes",
      image: "/images/potatoes.jpg",
      farmer: "Robert Johnson",
      phone: "+250 78 555 1212",
      price: "250"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="home-container"
    >
      <Navbar />
      
      {/* Products Section */}
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
              <img src={product.image} alt={product.name} />
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
      
      {/* Footer */}
      <footer className="home-footer">
        <p>{t('home.footerText')}</p>
      </footer>
    </motion.div>
  );
};

export default HomePage;
