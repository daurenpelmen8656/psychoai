# 🚀 Быстрый запуск MindBridge

## ⚠️ ВАЖНО: Как запустить приложение

Это **React приложение** и требует компиляции.

### Первый запуск (если модули не установлены):

```bash
npm install
npm start
```

Откроется `http://localhost:3000` в браузере.

### Обычный запуск:

```bash
npm start
```

### Для production build:

```bash
npm run build
```

## 📋 Структура проекта

- `public/` - Landing page (HTML/CSS/JS)
- `src/` - React приложение
  - `pages/` - Компоненты страниц (Chat, Onboarding, Dashboard и т.д.)
  - `components/` - Переиспользуемые компоненты
  - `App.js` - Главное приложение с routing

## 🎯 Как это работает

1. **Landing page** (`public/index.html`) показывается по умолчанию
2. При клике на кнопку (например, "Get Started" или "Sign In"), происходит переход по хешу:
   - `#/onboarding` → Onboarding страница (регистрация)
   - `#/chat` → Chat страница
   - `#/dashboard` → Dashboard страница
3. React приложение автоматически включается при переходе на эти страницы
4. После завершения onboarding переводит в chat

## ✅ Проверка

Убедитесь что в браузере:
- ✓ Видна landing page с кнопками
- ✓ Клик на "Get Started Free" или "Sign In" работает
- ✓ Переходит на Onboarding форму
- ✓ После заполнения - переходит в Chat

## 🔧 Исправления которые были сделаны

1. ✅ Исправлена синтаксическая ошибка в `public/script.js`
2. ✅ Удален конфликтующий redirect код
3. ✅ Включена поддержка React Router с HashRouter
4. ✅ Добавлена правильная обработка anchor links
5. ✅ `public/index.html` теперь показывает React app при навигации на `/chat`, `/onboarding` и т.д.
