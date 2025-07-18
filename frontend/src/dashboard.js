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
}
export default Dashboard;
