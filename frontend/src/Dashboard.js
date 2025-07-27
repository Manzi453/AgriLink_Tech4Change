import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = 'https://agrilink-backend-production.up.railway.app';

function FarmerDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    price: '',
    image: null
  });
  const [showForm, setShowForm] = useState(false);
  const farmerId = localStorage.getItem('farmerId');

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/my-products`, {
        params: { farmerId },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProducts(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: newProduct.name,
        quantity: newProduct.quantity,
        price: newProduct.price
      };
      await axios.post(`${API_URL}/product/listing`, payload, {
        params: { farmerId },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewProduct({ name: '', quantity: '', price: '', image: null });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error('Add product failed:', err);
    }
  };

  const togglePublish = async (productId) => {
    try {
      await axios.put(`${API_URL}/product/publish/${productId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchProducts();
    } catch (err) {
      console.error('Publish product failed:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-container">
      <div className="dashboard-sidebar">
        <ul>
          <li><a href="#" onClick={() => setActiveTab('dashboard')}>{t('dashboard.dashboard')}</a></li>
          <li><a href="#" onClick={() => setActiveTab('mycrops')}>{t('dashboard.myCrops')}</a></li>
        </ul>
      </div>
      <div className="dashboard-main">
        {activeTab === 'dashboard' && (
          <>
            <h1>{t('dashboard.greeting')}, Farmer!</h1>
            <div className="product-feed">
              {products.filter(p => p.published).map(p => (
                <div key={p.id} className="product-card">
                  <h3>{p.name}</h3>
                  <p>{t('dashboard.available')}: {p.quantity}</p>
                  <p>{t('dashboard.price')}: {p.price}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'mycrops' && (
          <>
            <h1>{t('dashboard.myCrops')}</h1>
            <button onClick={() => setShowForm(!showForm)}>
              {showForm ? t('dashboard.cancel') : t('dashboard.addCrop')}
            </button>
            {showForm && (
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Crop Name" value={newProduct.name} onChange={handleInputChange} required />
                <input type="number" name="quantity" placeholder="Quantity" value={newProduct.quantity} onChange={handleInputChange} required />
                <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} required />
                <input type="file" onChange={handleImageChange} />
                <button type="submit">{t('dashboard.save')}</button>
              </form>
            )}
            <div className="product-grid">
              {products.map(p => (
                <div key={p.id} className="product-card">
                  <h3>{p.name}</h3>
                  <p>{p.quantity} kg - {p.price} RWF/kg</p>
                  <button onClick={() => togglePublish(p.id)}>
                    {p.published ? t('dashboard.published') : t('dashboard.publish')}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default FarmerDashboard;