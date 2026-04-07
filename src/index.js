import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Создаём root элемент динамически
const rootEl = document.createElement('div');
rootEl.id = 'react-root';
rootEl.style.cssText = 'position:fixed;inset:0;z-index:9999;';
document.body.appendChild(rootEl);

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
