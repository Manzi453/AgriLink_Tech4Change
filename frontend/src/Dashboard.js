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
}

export default Dashboard;
