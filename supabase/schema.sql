CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'free',
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe ON users(stripe_customer_id);

CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL,
  difficulty_level INT NOT NULL DEFAULT 1,
  score INT NOT NULL,
  max_score INT NOT NULL,
  accuracy FLOAT NOT NULL,
  duration_seconds INT NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW(),
  game_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON game_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_type ON game_sessions(game_type);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON game_sessions(completed_at);

CREATE TABLE IF NOT EXISTS ai_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  total_sessions INT NOT NULL,
  total_duration_seconds INT NOT NULL,
  average_accuracy FLOAT NOT NULL,
  report_content TEXT NOT NULL,
  improvements TEXT[],
  suggestions TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, week_start_date)
);

CREATE INDEX IF NOT EXISTS idx_reports_user ON ai_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_week ON ai_reports(week_start_date);

CREATE TABLE IF NOT EXISTS game_configs (
  game_type TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  min_difficulty INT DEFAULT 1,
  max_difficulty INT DEFAULT 10,
  base_duration_seconds INT DEFAULT 180,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO game_configs (game_type, name, description) VALUES
  ('number_memory', 'Number Memory', 'Recall a flashing number sequence'),
  ('quick_match', 'Quick Match', 'Pick the matching color and shape'),
  ('n_back', 'N-Back', 'Judge whether the current stimulus matches N steps back'),
  ('task_switch', 'Task Switch', 'Switch quickly between two simple rules'),
  ('stroop', 'Stroop Test', 'Choose the ink color and ignore word meaning')
ON CONFLICT (game_type) DO NOTHING;
