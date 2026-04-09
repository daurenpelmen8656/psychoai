-- ============================================================================
-- SUPABASE SQL SETUP SCRIPT FOR MINDBRIDGE
-- Выполни этот скрипт в Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- 1. СОЗДАТЬ ТАБЛИЦУ USERS (для регистрации)
-- ============================================================================

DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users (
  id BIGINT PRIMARY KEY DEFAULT gen_random_bytes(16)::bigint,
  name TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  goal TEXT,
  therapist TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Включить RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy для чтения
CREATE POLICY "users_read_all"
  ON public.users FOR SELECT
  USING (true);

-- Policy для вставки
CREATE POLICY "users_insert_all"
  ON public.users FOR INSERT
  WITH CHECK (true);

-- Policy для обновления
CREATE POLICY "users_update_all"
  ON public.users FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- 2. СОЗДАТЬ ТАБЛИЦУ MESSAGES (для чата)
-- ============================================================================

DROP TABLE IF EXISTS public.messages CASCADE;

CREATE TABLE public.messages (
  id BIGINT PRIMARY KEY DEFAULT gen_random_bytes(16)::bigint,
  user_id BIGINT OR TEXT,
  role TEXT NOT NULL CHECK (role IN ('user', 'ai')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Создать индекс для быстрого поиска по user_id
CREATE INDEX idx_messages_user_id ON public.messages(user_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

-- Включить RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policy для чтения
CREATE POLICY "messages_read_all"
  ON public.messages FOR SELECT
  USING (true);

-- Policy для вставки
CREATE POLICY "messages_insert_all"
  ON public.messages FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- 3. СОЗДАТЬ ТАБЛИЦУ CHAT_SESSIONS (опционально, для истории чатов)
-- ============================================================================

DROP TABLE IF EXISTS public.chat_sessions CASCADE;

CREATE TABLE public.chat_sessions (
  id BIGINT PRIMARY KEY DEFAULT gen_random_bytes(16)::bigint,
  user_id BIGINT OR TEXT NOT NULL,
  title TEXT DEFAULT 'Untitled Chat',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_sessions_user_id ON public.chat_sessions(user_id);

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_sessions_read_all"
  ON public.chat_sessions FOR SELECT
  USING (true);

CREATE POLICY "chat_sessions_insert_all"
  ON public.chat_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "chat_sessions_update_all"
  ON public.chat_sessions FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- 4. СОЗДАТЬ ТАБЛИЦУ USER_PROFILES (для сохранения дополнительных данных)
-- ============================================================================

DROP TABLE IF EXISTS public.user_profiles CASCADE;

CREATE TABLE public.user_profiles (
  id BIGINT PRIMARY KEY DEFAULT gen_random_bytes(16)::bigint,
  user_id BIGINT NOT NULL UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_read_all"
  ON public.user_profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_insert_all"
  ON public.user_profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "profiles_update_all"
  ON public.user_profiles FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- ✅ ГОТОВО!
-- ============================================================================
-- Таблицы созданы и готовы к использованию
-- 
-- Таблицы:
-- - users: данные пользователей из Onboarding
-- - messages: сообщения из Chat
-- - chat_sessions: история чатов (опционально)
-- - user_profiles: дополнительные профили (опционально)
--
-- Проверить:
-- SELECT * FROM public.users;
-- SELECT * FROM public.messages;
-- ============================================================================
