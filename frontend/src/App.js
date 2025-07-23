import React from 'react';
// React Router for client-side navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// AnimatePresence for page transition animations
import { AnimatePresence } from 'framer-motion';
// Internationalization provider
import { I18nextProvider } from 'react-i18next';
// i18n config file
import i18n from './i18n';
// Page components
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';
import MembershipPage from './MembershipPage';
import AuthPage from './AuthPage';
import Dashboard from './Dashboard';
// Global styles
import './App.css';

const App = () => {
  return (
    // Wrap the app with i18n provider for translation support
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="app">
          {/* AnimatePresence enables exit animations for route transitions */}
          <AnimatePresence mode="wait">
            <Routes>
              {/* Define app routes and corresponding page components */}
              <Route path="/" element={<WelcomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </I18nextProvider>
  );
};

export default App;
