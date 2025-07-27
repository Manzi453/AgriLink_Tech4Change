import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';
import MembershipPage from './MembershipPage';
import AuthPage from './AuthPage';
import FarmerDashboard from './Dashboard'; // Renamed to FarmerDashboard
import ClientDashboard from './ClientDashboard';
import AdminDashboard from './AdminDashboard';
import './App.css';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="app">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
              <Route path="/client-dashboard" element={<ClientDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </I18nextProvider>
  );
};

export default App;



