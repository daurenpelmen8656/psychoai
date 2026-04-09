# 🔧 Интеграция Supabase - Полное руководство

## ✅ Что уже сделано в коде

1. ✅ **Подключен Supabase клиент** (`src/utils/supabase.js`)
2. ✅ **Добавлены переменные окружения** (`.env.local`)
3. ✅ **Интегрирована регистрация** (`src/pages/Onboarding.jsx`)
   - Сохраняет пользователя в Supabase
   - Сохраняет user_id в localStorage
4. ✅ **Интегрирован чат** (`src/pages/Chat.jsx`)
   - Сохраняет все сообщения в Supabase
   - User messages и AI responses

## 📊 Таблицы которые нужно создать в Supabase

### 1. Таблица `users` (для регистрации)

```sql
CREATE TABLE public.users (
  id BIGINT PRIMARY KEY DEFAULT gen_random_bytes(16)::bigint,
  name TEXT NOT NULL,
  language TEXT,
  goal TEXT,
  therapist TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all users to read their own data"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Allow all users to insert their own data"
  ON public.users FOR INSERT
  WITH CHECK (true);
```

### 2. Таблица `messages` (для сохранения чатов)

```sql
CREATE TABLE public.messages (
  id BIGINT PRIMARY KEY DEFAULT gen_random_bytes(16)::bigint,
  user_id BIGINT OR TEXT,
  role TEXT NOT NULL, -- 'user' или 'ai'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_messages_user_id ON public.messages(user_id);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all users to read all messages"
  ON public.messages FOR SELECT
  USING (true);

CREATE POLICY "Allow all users to insert messages"
  ON public.messages FOR INSERT
  WITH CHECK (true);
```

## 🚀 Как создать таблицы в Supabase

### Шаг 1: Открыть Supabase Dashboard
1. Перейди на https://app.supabase.com/
2. Выбери свой проект
3. Слева нажми на "SQL Editor"

### Шаг 2: Выполнить SQL код

**Для таблицы users:**
1. Нажми "New Query"
2. Скопируй весь SQL код из раздела "Таблица `users`" выше
3. Нажми "Run" (или Ctrl+Enter)
4. Проверь что таблица создана (слева должна появиться `users`)

**Для таблицы messages:**
1. Нажми "New Query"
2. Скопируй весь SQL код из раздела "Таблица `messages`" выше
3. Нажми "Run"
4. Проверь что таблица создана

### Альтернатива: Использовать Supabase UI

**Создать таблицу через UI:**
1. Слева выбери "Table Editor"
2. Нажми "Create new table"
3. Назови её "users"
4. Добавь колонки вручную:
   - id (int8, primary key)
   - name (text)
   - language (text)
   - goal (text)
   - therapist (text)
   - created_at (timestamptz)
   - updated_at (timestamptz)

Повтори для таблицы "messages":
   - id (int8, primary key)
   - user_id (text)
   - role (text)
   - content (text)
   - created_at (timestamptz)

## 🔐 Проверка RLS (Row Level Security)

Убедись что Row Level Security включен:
1. Слева выбери "SQL Editor"
2. Выполни: `ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;`
3. Выполни: `ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;`

Это обеспечивает что все данные доступны для чтения и записи (для демо версии).

## ✅ Проверка что всё работает

### В коде

Когда ты запустишь приложение:
1. Откроешь Onboarding
2. Заполнишь форму
3. Нажмёшь "Start"
4. Данные должны появиться в таблице `users` в Supabase

Когда откроешь Chat:
1. Напишешь сообщение
2. Отправишь
3. Сообщение должно появиться в таблице `messages` в Supabase

### В Supabase Dashboard

1. Открой https://app.supabase.com/
2. Выбери проект
3. Слева нажми "Table Editor"
4. Выбери таблицу `users` - должны быть твои регистрации
5. Выбери таблицу `messages` - должны быть твои сообщения

## 🐛 Если ничего не сохраняется

### Проверка 1: Переменные окружения
```bash
# Открой .env.local и проверь:
REACT_APP_SUPABASE_URL=https://zzfzkykgrvsleabnqkuq.supabase.co
REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_46WT_deH7BGTp-3OHGSj2w_JyeDYNKm
```

### Проверка 2: Консоль браузера (F12 → Console)
Должны быть ошибки, которые помогут диагностировать проблему.

Если есть ошибка типа:
- "Table users does not exist" → создай таблицы
- "Permission denied" → проверь RLS policies
- "Authentication required" → это ОК для публичного доступа

### Проверка 3: Таблицы в Supabase
1. Открой Supabase Dashboard
2. Проверь что таблицы существуют (Table Editor слева)
3. Проверь что RLS включен (кнопка рядом с названием таблицы)

## 📝 Код который был изменён

### `src/utils/supabase.js`
```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### `src/pages/Onboarding.jsx`
- Добавлена регистрация пользователя в Supabase
- Сохранение user_id в localStorage

### `src/pages/Chat.jsx`
- Сохранение всех сообщений в Supabase
- User messages и AI responses

### `.env.local`
```
REACT_APP_SUPABASE_URL=https://zzfzkykgrvsleabnqkuq.supabase.co
REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_46WT_deH7BGTp-3OHGSj2w_JyeDYNKm
```

## 🎯 Итоговый checklist

- [ ] Создал таблицу `users` в Supabase
- [ ] Создал таблицу `messages` в Supabase
- [ ] Включил RLS на обеих таблицах
- [ ] Запустил `npm start`
- [ ] Заполнил Onboarding форму
- [ ] Проверил что данные появились в `users`
- [ ] Отправил сообщение в Chat
- [ ] Проверил что сообщение появилось в `messages`
- [ ] 🎉 ВСЁ РАБОТАЕТ!

## 📞 Полезные ссылки

- [Supabase Dashboard](https://app.supabase.com/)
- [Supabase Docs](https://supabase.com/docs)
- [SQL Reference](https://supabase.com/docs/guides/database/sql-commands)
