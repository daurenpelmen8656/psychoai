import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Создаём root элемент динамически
const rootEl = document.createElement('div');
rootEl.id = 'react-root';
rootEl.style.cssText = 'position:fixed;inset:0;z-index:9999;';
document.body.appendChild(rootEl);

// Функция для проверки, нужен ли React
function isReactPath() {
  const hash = window.location.hash.slice(1) || '/';
  return ['/chat', '/games', '/dashboard', '/profile', '/onboarding'].some(p => hash.startsWith(p));
}

// Активируем React, если нужен правильный путь
if (isReactPath()) {
  document.body.classList.add('react-active');
}

// Слушаем изменения hash
window.addEventListener('hashchange', () => {
  if (isReactPath()) {
    document.body.classList.add('react-active');
  } else {
    document.body.classList.remove('react-active');
  }
});

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
