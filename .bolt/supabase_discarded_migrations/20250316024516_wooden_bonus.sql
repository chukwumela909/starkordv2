/*
  # Add platform enhancement tables

  1. New Tables
    - tutorials
    - achievements
    - competition_entries
    - competition_rewards
    - user_achievements
    - user_tutorials

  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- Create tutorials table
CREATE TABLE IF NOT EXISTS tutorials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  difficulty text CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  category text NOT NULL,
  video_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  category text NOT NULL,
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create competition_entries table
CREATE TABLE IF NOT EXISTS competition_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  competition_id text NOT NULL,
  amount numeric NOT NULL,
  rank integer,
  rewards jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create competition_rewards table
CREATE TABLE IF NOT EXISTS competition_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id text NOT NULL,
  place integer NOT NULL,
  eth_reward numeric NOT NULL,
  badge text NOT NULL,
  perks jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create user_tutorials table
CREATE TABLE IF NOT EXISTS user_tutorials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  tutorial_id uuid REFERENCES tutorials(id) ON DELETE CASCADE NOT NULL,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tutorial_id)
);

-- Enable RLS
ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tutorials ENABLE ROW LEVEL SECURITY;

-- Policies for tutorials
CREATE POLICY "Tutorials are viewable by all authenticated users"
  ON tutorials FOR SELECT
  TO authenticated
  USING (true);

-- Policies for achievements
CREATE POLICY "Achievements are viewable by all authenticated users"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- Policies for competition entries
CREATE POLICY "Users can view own competition entries"
  ON competition_entries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own competition entries"
  ON competition_entries FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policies for competition rewards
CREATE POLICY "Competition rewards are viewable by all authenticated users"
  ON competition_rewards FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user achievements
CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert user achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policies for user tutorials
CREATE POLICY "Users can view own tutorial progress"
  ON user_tutorials FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own tutorial progress"
  ON user_tutorials FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Function to update competition rankings
CREATE OR REPLACE FUNCTION update_competition_rankings()
RETURNS void AS $$
BEGIN
  UPDATE competition_entries
  SET rank = ranks.rank
  FROM (
    SELECT 
      id,
      RANK() OVER (PARTITION BY competition_id ORDER BY amount DESC) as rank
    FROM competition_entries
    WHERE competition_id = TO_CHAR(DATE_TRUNC('month', CURRENT_DATE), 'YYYY-MM')
  ) ranks
  WHERE competition_entries.id = ranks.id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update rankings when entries change
CREATE TRIGGER update_competition_rankings_trigger
  AFTER INSERT OR UPDATE OF amount ON competition_entries
  FOR EACH STATEMENT
  EXECUTE FUNCTION update_competition_rankings();