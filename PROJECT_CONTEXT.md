# PsychoAI — MindBridge

## Стек
- Create React App
- React Router DOM
- Supabase (авторизация + БД)
- Чистый CSS через inline styles (без библиотек)

## Структура
public/
index.html      ← оригинальный лендинг MindBridge
styles.css
script.js
src/
pages/
Chat.jsx       ← ИИ психолог в стиле Claude
Games.jsx      ← Memory Game + Logic Test
Dashboard.jsx  ← личный кабинет
Profile.jsx    ← профиль с вкладками
Onboarding.jsx ← 4 шага после регистрации
utils/
supabase.js    ← клиент Supabase
App.js
index.js
.env               ← REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY

## Что сделано
- Лендинг на главной /
- /chat — чат с ИИ (пока мок-ответы), 11 языков, темы, настройки
- /games — Memory Game (3 уровня) + Logic Test (8 вопросов)
- /onboarding — имя, язык, цель, выбор терапевта
- /dashboard — настроение, статистика, достижения, советы
- /profile — редактирование, вкладки, история, бейджи
- Supabase подключён, таблицы созданы (profiles, chat_sessions, messages, mood_logs, game_results)

## Что осталось сделать
1. Связать кнопки лендинга с /onboarding и /chat
2. Адаптивность на мобильных
3. Подключить реальный ИИ API
4. Страница 404
5. Авторизация через Supabase (регистрация/вход)
6. Сохранение данных в БД (чат, настроение, игры)

## Дизайн
- Цвета: --primary #4A6CF7, --accent #8B5CF6, --secondary #10B981
- Шрифт: Inter
- Все стили inline, без внешних CSS библиотек
- Темы: light / dark / accessible
- Анимации через @keyframes в <style> тегах внутри компонентов
