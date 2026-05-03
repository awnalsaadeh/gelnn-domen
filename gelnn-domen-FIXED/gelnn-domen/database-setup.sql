-- =============================================
-- نور - Glenn Doman System Database Setup
-- Copy and run this in Supabase SQL Editor
-- =============================================

-- Enable Row Level Security
-- This makes sure each parent only sees their own data

-- 1. Children table
CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  birth_date DATE,
  language TEXT DEFAULT 'ar',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE children ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own children" ON children
  FOR ALL USING (auth.uid() = user_id);

-- 2. Categories table (groups of related words)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  name_ar TEXT NOT NULL,
  name_en TEXT DEFAULT '',
  name_es TEXT DEFAULT '',
  color TEXT DEFAULT '#D4780A',
  emoji TEXT DEFAULT '📚',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own categories" ON categories
  FOR ALL USING (auth.uid() = user_id);

-- 3. Words table
CREATE TABLE IF NOT EXISTS words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  text_ar TEXT NOT NULL,
  text_en TEXT DEFAULT '',
  text_es TEXT DEFAULT '',
  image_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'retired')),
  introduced_at DATE,
  retire_at DATE,
  times_shown INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own words" ON words
  FOR ALL USING (auth.uid() = user_id);

-- 4. Sessions log (tracks each time a session is done)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  session_number INT NOT NULL CHECK (session_number BETWEEN 1 AND 3),
  words_shown UUID[] DEFAULT '{}',
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  day DATE DEFAULT CURRENT_DATE
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own sessions" ON sessions
  FOR ALL USING (auth.uid() = user_id);

-- 5. Helper function: Auto-retire words after 5 days
CREATE OR REPLACE FUNCTION auto_retire_words()
RETURNS void AS $$
BEGIN
  UPDATE words
  SET status = 'retired'
  WHERE status = 'active'
    AND (
      times_shown >= 15
      OR (introduced_at IS NOT NULL AND introduced_at + INTERVAL '5 days' <= CURRENT_DATE)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Sample indexes for performance
CREATE INDEX IF NOT EXISTS idx_words_user_status ON words(user_id, status);
CREATE INDEX IF NOT EXISTS idx_words_category ON words(category_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_day ON sessions(user_id, day);

-- =============================================
-- Done! Your database is ready 🎉
-- =============================================
