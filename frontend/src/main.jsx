import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import CSS first to ensure styles are loaded before components
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);