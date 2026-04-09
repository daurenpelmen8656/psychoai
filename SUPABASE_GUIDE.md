# 📊 SUPABASE INTEGRATION - VISUAL GUIDE

## 🔄 КАК РАБОТАЕТ ИНТЕГРАЦИЯ

```
ПРИЛОЖЕНИЕ (localhost:3000)
         ↓
    [ONBOARDING]
         ↓
    Пользователь заполняет форму
         ↓
    Нажимает "Start"
         ↓
    ↙                      ↘
 SUPABASE               LOCALSTORAGE
 (Таблица users)        (mb_user, mb_user_id)
 ✅ Сохраняется         ✅ Сохраняется
         ↓                    ↓
    [CHAT OPENS]
         ↓
    Загружает историю из SUPABASE (если есть)
         ↓
    Пользователь пишет сообщение
         ↓
    ↙                      ↘
 SUPABASE               UI (видит сразу)
 (Таблица messages)    ✅ Появляется
 ✅ Сохраняется
         ↓
    AI отвечает
         ↓
    ↙                      ↘
 SUPABASE               UI (видит сразу)
 (Таблица messages)    ✅ Появляется
 ✅ Сохраняется
```

## 📊 СТРУКТУРА БД

```
SUPABASE
├── users (таблица)
│   ├── id (PRIMARY KEY)
│   ├── name
│   ├── language
│   ├── goal
│   ├── therapist
│   ├── created_at
│   └── updated_at
│
├── messages (таблица)
│   ├── id (PRIMARY KEY)
│   ├── user_id (FK)
│   ├── role (user / ai)
│   ├── content
│   └── created_at
│
├── chat_sessions (таблица, опционально)
│   ├── id (PRIMARY KEY)
│   ├── user_id (FK)
│   ├── title
│   ├── is_active
│   ├── created_at
│   └── updated_at
│
└── user_profiles (таблица, опционально)
    ├── id (PRIMARY KEY)
    ├── user_id (FK)
    ├── bio
    ├── avatar_url
    ├── preferences (JSONB)
    ├── created_at
    └── updated_at
```

## 🎯 ПРИМЕРЫ ДАННЫХ

### Что сохраняется в `users` таблице:

```json
{
  "id": 1234567890,
  "name": "Иван",
  "language": "ru",
  "goal": "anxiety",
  "therapist": "aria",
  "created_at": "2026-04-08T15:28:31.850Z",
  "updated_at": "2026-04-08T15:28:31.850Z"
}
```

### Что сохраняется в `messages` таблице:

```json
[
  {
    "id": 1234567891,
    "user_id": 1234567890,
    "role": "user",
    "content": "Я чувствую тревогу",
    "created_at": "2026-04-08T15:29:00.000Z"
  },
  {
    "id": 1234567892,
    "user_id": 1234567890,
    "role": "ai",
    "content": "Я понимаю, это нормальное чувство. Давайте обсудим что вас беспокоит...",
    "created_at": "2026-04-08T15:29:15.000Z"
  }
]
```

## 🔐 SECURITY (RLS - Row Level Security)

Все таблицы имеют включенный RLS:

```sql
-- Все пользователи могут читать
CREATE POLICY "read_all" ON users FOR SELECT USING (true);

-- Все пользователи могут писать
CREATE POLICY "insert_all" ON users FOR INSERT WITH CHECK (true);

-- Все пользователи могут обновлять
CREATE POLICY "update_all" ON users FOR UPDATE USING (true) WITH CHECK (true);
```

Это означает что все могут читать и писать в таблицы (для публичного доступа).
Для production нужно будет усилить безопасность.

## 📱 ИНТЕГРАЦИЯ В КОМПОНЕНТАХ

### Onboarding.jsx

```javascript
// Сохраняет при завершении регистрации
const { data: userData } = await supabase.from('users').insert([...]).select();
localStorage.setItem('mb_user_id', userData[0].id);
```

### Chat.jsx

```javascript
// Загружает историю при открытии
const { data } = await supabase
  .from('messages')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: true });

// Сохраняет каждое сообщение
await supabase.from('messages').insert([
  { user_id, role: 'user', content, created_at: new Date() }
]);
```

## 🚀 ШАГИ ДЛЯ ЗАПУСКА

```
1. SQL SCRIPT
   ├─ Откройте supabase.sql
   ├─ Скопируйте содержимое
   ├─ Table Editor → SQL Editor → New Query
   └─ Вставьте и выполните

2. START APP
   ├─ npm install (если нужно)
   └─ npm start

3. TEST IT
   ├─ Заполните Onboarding
   ├─ Напишите в Chat
   ├─ Откройте Supabase Dashboard
   └─ Смотрите данные в таблицах ✅
```

## ✅ ЧЕКЛИСТ

- [ ] Выполнил SQL скрипт в Supabase
- [ ] npm start работает без ошибок
- [ ] Заполнил Onboarding форму
- [ ] Перешел в Chat (данные из Supabase загрузились если были)
- [ ] Написал сообщение в Chat
- [ ] Открыл Supabase Dashboard
- [ ] Вижу данные в таблице users
- [ ] Вижу сообщения в таблице messages
- [ ] История загружается при открытии Chat
- [ ] 🎉 ВСЕ РАБОТАЕТ!

## 🔗 ПОЛЕЗНЫЕ ССЫЛКИ

- Supabase Console: https://app.supabase.com/
- Supabase Docs: https://supabase.com/docs
- SQL Commands: https://supabase.com/docs/guides/database/sql-commands
- JavaScript Client: https://supabase.com/docs/reference/javascript/introduction

## 📝 ФАЙЛЫ ДЛЯ ИЗУЧЕНИЯ

1. `supabase.sql` - SQL скрипт для БД
2. `src/utils/supabase.js` - Supabase клиент
3. `src/pages/Onboarding.jsx` - интеграция регистрации
4. `src/pages/Chat.jsx` - интеграция чата
5. `.env.local` - переменные окружения
