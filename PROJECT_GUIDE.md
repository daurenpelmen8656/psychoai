# 📚 MindBridge AI - Полная документация

## 📌 Быстрые ссылки для начинающих

| Документ | Для чего | Время |
|----------|----------|-------|
| **[START_HERE.md](START_HERE.md)** | Первый запуск приложения | 5 мин |
| **[SUPABASE_QUICKREF.txt](SUPABASE_QUICKREF.txt)** | Supabase в 1 минуту | 1 мин |
| **[SUPABASE_READY.md](SUPABASE_READY.md)** | Полный checklist Supabase | 10 мин |
| **[INSTALLATION.md](INSTALLATION.md)** | Детальная установка | 15 мин |
| **[SUPABASE_GUIDE.md](SUPABASE_GUIDE.md)** | Как это работает | 20 мин |

---

## 🚀 Самый быстрый старт (3 минуты)

### 1️⃣ Supabase (1 минута)
```
Открой: https://app.supabase.com/
SQL Editor → New Query
Скопируй: суpabase.sql файл
Вставь и нажми: Run
```

### 2️⃣ Приложение (30 секунд)
```bash
npm start
```

### 3️⃣ Проверка (1 минута)
- Заполни Onboarding форму
- Напиши сообщение в Chat
- Открой Supabase Dashboard
- Смотри свои данные в таблицах ✅

---

## 📊 Структура проекта

```
psychoai/
├── public/                  # Landing page (HTML/CSS/JS)
│   ├── index.html          # Главная страница
│   ├── script.js           # Логика landing page
│   ├── styles.css          # Стили
│   └── ...
│
├── src/                    # React приложение
│   ├── pages/
│   │   ├── Onboarding.jsx  # 📝 Регистрация
│   │   ├── Chat.jsx        # 💬 Чат с AI
│   │   ├── Dashboard.jsx   # 📊 Дашборд
│   │   ├── Games.jsx       # 🎮 Мини-игры
│   │   └── ...
│   │
│   ├── utils/
│   │   └── supabase.js     # 🔌 Supabase клиент
│   │
│   ├── components/         # Переиспользуемые компоненты
│   ├── context/           # React контексты
│   └── App.js             # Главное приложение
│
├── .env.local             # 🔑 Переменные окружения
├── supabase.sql           # 📊 SQL скрипт для БД
└── package.json           # Dependencies

```

---

## 🔌 Интеграция Supabase

### Таблицы БД

| Таблица | Назначение | Содержит |
|---------|-----------|----------|
| `users` | Регистрация | name, language, goal, therapist |
| `messages` | Чат | user_id, role (user/ai), content |
| `chat_sessions` | История чатов | user_id, title, is_active |
| `user_profiles` | Профили | avatar, bio, preferences |

### Как данные сохраняются

```
Onboarding Форма
    ↓
    Пользователь заполняет
    ↓
    Нажимает "Start"
    ↓
    Сохраняется в таблицу users
    ↓
    user_id сохраняется в localStorage
    ↓
Chat открывается
    ↓
    Загружает историю сообщений из Supabase
    ↓
Пользователь пишет сообщение
    ↓
    Сохраняется в таблицу messages
    ↓
    AI отвечает
    ↓
    Ответ сохраняется в таблицу messages
```

---

## 📋 Все документы

### 🚀 Первый запуск
- **[START_HERE.md](START_HERE.md)** - Чеклист для запуска
- **[INSTALLATION.md](INSTALLATION.md)** - Подробная установка
- **[QUICKSTART.md](QUICKSTART.md)** - Быстрый старт

### 🔧 Исправления и обновления
- **[DIAGNOSIS.md](DIAGNOSIS.md)** - Диагностика проблем
- **[FIXES_SUMMARY.md](FIXES_SUMMARY.md)** - Все исправления

### 🔌 Supabase интеграция
- **[SUPABASE_QUICKREF.txt](SUPABASE_QUICKREF.txt)** - Шпаргалка (1 мин)
- **[SUPABASE_QUICK.md](SUPABASE_QUICK.md)** - Быстрый старт
- **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** - Подробное руководство
- **[SUPABASE_GUIDE.md](SUPABASE_GUIDE.md)** - Визуальное руководство
- **[SUPABASE_READY.md](SUPABASE_READY.md)** - Полный checklist
- **[SUPABASE_COMPLETE.md](SUPABASE_COMPLETE.md)** - Итоговое резюме
- **[supabase.sql](supabase.sql)** - 📊 SQL скрипт (ГЛАВНЫЙ ФАЙЛ!)

---

## 🎯 Как начать

### Новичок?
1. Читай **[START_HERE.md](START_HERE.md)**
2. Выполни **[INSTALLATION.md](INSTALLATION.md)**
3. Запусти `npm start`

### Хочу Supabase?
1. Читай **[SUPABASE_QUICKREF.txt](SUPABASE_QUICKREF.txt)** (1 мин)
2. Выполни **[supabase.sql](supabase.sql)** в Supabase
3. Всё готово!

### Хочу понять как это работает?
1. Читай **[SUPABASE_GUIDE.md](SUPABASE_GUIDE.md)**
2. Смотри код в `src/pages/Onboarding.jsx` и `Chat.jsx`
3. Смотри БД структуру в `supabase.sql`

---

## 🎓 Технологии

- **Frontend**: React 19, React Router 7
- **Styling**: Custom CSS (no frameworks)
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (опционально)
- **Charts**: Chart.js
- **Build**: Create React App

---

## ✅ Функциональность

### Landing Page
- ✅ Красивый дизайн с информацией
- ✅ Кнопки навигации (Get Started, Sign In)
- ✅ Responsive для мобильных
- ✅ Темная тема
- ✅ Доступность (accessibility)

### Onboarding
- ✅ Регистрация пользователя
- ✅ Выбор языка (11 языков)
- ✅ Выбор цели
- ✅ Выбор AI психолога
- ✅ Сохранение в Supabase

### Chat
- ✅ Чат с AI психологом
- ✅ Автоматические ответы
- ✅ История сообщений
- ✅ Разные темы (light/dark/accessible)
- ✅ Настройка размера шрифта

### Dashboard
- ✅ Статистика благополучия
- ✅ Графики настроения
- ✅ Ежедневные check-ins

---

## 🔐 Безопасность

- ✅ Row Level Security (RLS) включен
- ✅ Переменные окружения в `.env.local`
- ✅ Публичный доступ (для демо)

**Для production**: Нужно усилить RLS policies и включить Supabase Auth.

---

## 🐛 Решение проблем

### Приложение не запускается
→ Смотри [START_HERE.md](START_HERE.md) шаг за шагом

### Данные не сохраняются в Supabase
→ Выполни [supabase.sql](supabase.sql) в Supabase Dashboard

### Ошибки в консоли
→ Открой F12 → Console → смотри ошибки

### Supabase таблицы не видны
→ Проверь Table Editor в Supabase Dashboard

---

## 📞 Полезные ссылки

- [Supabase Dashboard](https://app.supabase.com/)
- [React Documentation](https://react.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)

---

## 🎉 Готово!

Приложение полностью готово к использованию:
- ✅ Frontend работает
- ✅ Supabase интегрирован
- ✅ Документация полная
- ✅ Код опубликован

**Начни с [START_HERE.md](START_HERE.md) или [SUPABASE_QUICKREF.txt](SUPABASE_QUICKREF.txt)!**

---

**Последнее обновление**: 2026-04-08  
**Версия**: 1.0 (Complete with Supabase)
