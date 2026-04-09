# 🚀 БЫСТРО: Подключение Supabase (3 шага)

## ✅ Шаг 1: Копировать SQL скрипт
Открой файл `supabase.sql` в этой папке и скопируй ВСЁ содержимое.

## ✅ Шаг 2: Выполнить в Supabase
1. Открой https://app.supabase.com/
2. Выбери свой проект
3. Слева нажми "SQL Editor"
4. Нажми "New Query"
5. Вставь код из `supabase.sql` (Ctrl+V)
6. Нажми "Run" или Ctrl+Enter
7. Готово! Таблицы созданы ✅

## ✅ Шаг 3: Запустить приложение
```bash
npm start
```

## ✅ Проверить что работает

1. Открой приложение на http://localhost:3000
2. Нажми "Get Started Free"
3. Заполни Onboarding форму
4. Нажми "Start"
5. Напиши сообщение в Chat
6. Открой Supabase Dashboard
7. Table Editor → смотри таблицы `users` и `messages`
8. Твои данные должны быть там! 🎉

## 📝 Что было сделано в коде:

✅ `src/utils/supabase.js` - Supabase клиент готов
✅ `src/pages/Onboarding.jsx` - сохраняет в `users` таблицу
✅ `src/pages/Chat.jsx` - сохраняет в `messages` таблицу
✅ `.env.local` - переменные окружения установлены

## 🎯 Итого:

1. Скопируй SQL из `supabase.sql`
2. Выполни в Supabase Dashboard
3. Запусти `npm start`
4. Всё работает!

---

**Нужна помощь?** Смотри `SUPABASE_SETUP.md` для подробного руководства.
