import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';

function Dashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    price: '',
    image: null
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const farmerId = user?.id;
  const API_URL = 'https://agrilink-backend-production.up.railway.app/agriConnect';

  useEffect(() => {
    if (!user || !user.id) {
      console.warn('No user found in localStorage. Redirecting to login.');
      window.location.href = '/auth';
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/product/my-products?farmerId=${farmerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [token, farmerId]);

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewProduct(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.image) {
      alert("Please upload an image for the product.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("quantity", newProduct.quantity);
      formData.append("price", newProduct.price);
      formData.append("image", newProduct.image);

      await axios.post(`${API_URL}/product/listing?farmerId=${farmerId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const res = await axios.get(`${API_URL}/product/my-products?farmerId=${farmerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data.data || []);
      setShowProductForm(false);
      setNewProduct({ name: '', quantity: '', price: '', image: null });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handlePublishProduct = async (productId) => {
    try {
      await axios.put(`${API_URL}/product/publish/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const res = await axios.get(`${API_URL}/product/my-products?farmerId=${farmerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data.data || []);
    } catch (error) {
      console.error('Publish failed:', error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-container">
      <div className="dashboard-sidebar">
        <ul>
          <li><a href="#dashboard" onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>{t('dashboard.dashboard')}</a></li>
          <li><a href="#mycrops" onClick={() => setActiveTab('mycrops')} className={activeTab === 'mycrops' ? 'active' : ''}>{t('dashboard.myCrops')}</a></li>
          <li><a href="#messages" onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'active' : ''}>{t('dashboard.messages')}</a></li>
          <li><a href="#logout">{t('dashboard.logout')}</a></li>
        </ul>
      </div>

      <div className="dashboard-main">
        {activeTab === 'dashboard' && (
          <div className="product-feed">
            {products.filter(p => p.published).map(product => (
              <motion.div className="product-card" key={product.id} whileHover={{ scale: 1.03 }}>
                <img src={product.image || "/images/default-crop.jpg"} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{t('dashboard.available')}: {product.quantity} {t('units.kg')}</p>
                <p>{t('units.rwfPerKg')}: {product.price}</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'mycrops' && (
          <>
            <div className="section-header">
              <h1>{t('dashboard.myCrops')}</h1>
              {!showProductForm && (
                <motion.button className="welcome-btn" onClick={() => setShowProductForm(true)} whileHover={{ scale: 1.05 }}>{t('dashboard.addCrop')}</motion.button>
              )}
            </div>

            {showProductForm && (
              <motion.div className="product-form-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <form onSubmit={handleSubmitProduct} className="styled-form">
                  <input type="text" name="name" placeholder={t('dashboard.cropName')} value={newProduct.name} onChange={handleProductInputChange} required />
                  <input type="number" name="quantity" placeholder={`${t('dashboard.quantity')} (${t('units.kg')})`} value={newProduct.quantity} onChange={handleProductInputChange} required />
                  <input type="number" name="price" placeholder={`${t('dashboard.price')} (${t('units.rwfPerKg')})`} value={newProduct.price} onChange={handleProductInputChange} required />
                  <input type="file" accept="image/*" onChange={handleImageChange} required />
                  <div className="form-actions">
                    <motion.button type="submit" className="welcome-btn" whileHover={{ scale: 1.05 }}>{t('dashboard.save')}</motion.button>
                    <motion.button type="button" className="welcome-btn cancel-btn" onClick={() => setShowProductForm(false)} whileHover={{ scale: 1.05 }}>{t('dashboard.cancel')}</motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            <table className="styled-table">
              <thead>
                <tr>
                  <th>{t('dashboard.cropName')}</th>
                  <th>{t('dashboard.quantity')}</th>
                  <th>{t('dashboard.price')}</th>
                  <th>{t('dashboard.status')}</th>
                  <th>{t('dashboard.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>{product.published ? t('dashboard.published') : t('dashboard.unpublished')}</td>
                    <td>
                      <motion.button className={`publish-button ${product.published ? '' : 'unpublished'}`} onClick={() => handlePublishProduct(product.id)} whileHover={{ scale: 1.05 }}>
                        {product.published ? t('dashboard.published') : t('dashboard.publish')}
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'messages' && (
          <div className="community-chat-container">
            <h2>{t('dashboard.messages')}</h2>
            <p>Messaging will be enabled soon...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;