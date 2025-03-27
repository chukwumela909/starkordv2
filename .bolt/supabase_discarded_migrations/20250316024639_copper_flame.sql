/*
  # Add additional platform enhancement tables

  1. New Tables
    - notifications
    - user_preferences
    - staking_milestones
    - platform_analytics
    - user_activity_logs

  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text CHECK (type IN ('info', 'success', 'warning', 'error')),
  read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  email_notifications boolean DEFAULT true,
  price_alerts boolean DEFAULT true,
  yield_alerts boolean DEFAULT true,
  newsletter_subscription boolean DEFAULT true,
  theme text DEFAULT 'dark',
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create staking_milestones table
CREATE TABLE IF NOT EXISTS staking_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  stake_id uuid REFERENCES stakes(id) ON DELETE CASCADE NOT NULL,
  milestone_type text NOT NULL,
  target_value numeric NOT NULL,
  current_value numeric DEFAULT 0,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  reward_claimed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create platform_analytics table
CREATE TABLE IF NOT EXISTS platform_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  total_users integer DEFAULT 0,
  active_stakes integer DEFAULT 0,
  total_staked numeric DEFAULT 0,
  total_rewards_paid numeric DEFAULT 0,
  new_users_24h integer DEFAULT 0,
  stake_volume_24h numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user_activity_logs table
CREATE TABLE IF NOT EXISTS user_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE staking_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_logs ENABLE ROW LEVEL SECURITY;

-- Policies for notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for user_preferences
CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for staking_milestones
CREATE POLICY "Users can view own milestones"
  ON staking_milestones FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for platform_analytics
CREATE POLICY "Only admins can view analytics"
  ON platform_analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Policies for user_activity_logs
CREATE POLICY "Users can view own activity logs"
  ON user_activity_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Function to update staking milestones
CREATE OR REPLACE FUNCTION update_staking_milestones()
RETURNS trigger AS $$
BEGIN
  -- Update duration milestone
  UPDATE staking_milestones
  SET 
    current_value = EXTRACT(EPOCH FROM (now() - NEW.start_date)) / 86400,
    completed = CASE 
      WHEN EXTRACT(EPOCH FROM (now() - NEW.start_date)) / 86400 >= target_value THEN true
      ELSE false
    END,
    completed_at = CASE 
      WHEN EXTRACT(EPOCH FROM (now() - NEW.start_date)) / 86400 >= target_value THEN now()
      ELSE null
    END,
    updated_at = now()
  WHERE 
    stake_id = NEW.id 
    AND milestone_type = 'duration'
    AND NOT completed;

  -- Update amount milestone
  UPDATE staking_milestones
  SET 
    current_value = NEW.amount,
    completed = CASE 
      WHEN NEW.amount >= target_value THEN true
      ELSE false
    END,
    completed_at = CASE 
      WHEN NEW.amount >= target_value THEN now()
      ELSE null
    END,
    updated_at = now()
  WHERE 
    stake_id = NEW.id 
    AND milestone_type = 'amount'
    AND NOT completed;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for milestone updates
CREATE TRIGGER update_staking_milestones_trigger
  AFTER UPDATE OF amount ON stakes
  FOR EACH ROW
  EXECUTE FUNCTION update_staking_milestones();

-- Function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity(
  activity_type text,
  metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS void AS $$
BEGIN
  INSERT INTO user_activity_logs (
    user_id,
    activity_type,
    metadata,
    ip_address,
    user_agent
  )
  VALUES (
    auth.uid(),
    activity_type,
    metadata,
    current_setting('request.headers')::json->>'x-forwarded-for',
    current_setting('request.headers')::json->>'user-agent'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;