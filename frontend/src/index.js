import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from './i18n';
import './App.css';

// Create root element
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Render application
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// Optional: If you want to measure performance
// reportWebVitals(console.log); // or send to analytics endpoint
