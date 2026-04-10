-- ============================================================================
-- SUPABASE SQL SETUP SCRIPT FOR MINDBRIDGE
-- Выполни этот скрипт в Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================================

-- ============================================================================
-- 1. СОЗДАТЬ ТАБЛИЦУ USERS (для регистрации и Onboarding)
-- ============================================================================

DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.chat_sessions CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  language TEXT DEFAULT 'en',
  goal TEXT,
  therapist TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Включить RLS и разрешить всё (для разработки)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_all" ON public.users FOR SELECT USING (true);
CREATE POLICY "users_insert_all" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "users_update_all" ON public.users FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "users_delete_all" ON public.users FOR DELETE USING (true);

-- ============================================================================
-- 2. СОЗДАТЬ ТАБЛИЦУ MESSAGES (для чата)
-- ============================================================================

CREATE TABLE public.messages (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT,
  role TEXT NOT NULL CHECK (role IN ('user', 'ai')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_user_id ON public.messages(user_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select_all" ON public.messages FOR SELECT USING (true);
CREATE POLICY "messages_insert_all" ON public.messages FOR INSERT WITH CHECK (true);

-- ============================================================================
-- 3. СОЗДАТЬ ТАБЛИЦУ CHAT_SESSIONS (для истории чатов)
-- ============================================================================

CREATE TABLE public.chat_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT,
  title TEXT DEFAULT 'Untitled Chat',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_sessions_user_id ON public.chat_sessions(user_id);

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sessions_select_all" ON public.chat_sessions FOR SELECT USING (true);
CREATE POLICY "sessions_insert_all" ON public.chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "sessions_update_all" ON public.chat_sessions FOR UPDATE USING (true) WITH CHECK (true);

-- ============================================================================
-- 4. СОЗДАТЬ ТАБЛИЦУ USER_PROFILES (дополнительные данные профиля)
-- ============================================================================

CREATE TABLE public.user_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  bio TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_all" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_all" ON public.user_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "profiles_update_all" ON public.user_profiles FOR UPDATE USING (true) WITH CHECK (true);

-- ============================================================================
-- ✅ ГОТОВО! Проверить:
-- SELECT * FROM public.users;
-- SELECT * FROM public.messages;
-- ============================================================================
