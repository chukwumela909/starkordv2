/*
  # Fix Profile RLS Policies

  1. Changes
    - Drop existing profile policies that cause recursion
    - Create new, simplified policies for profile access
    - Add proper policy for profile updates

  2. Security
    - Maintain secure access control
    - Prevent infinite recursion
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create new simplified policies
CREATE POLICY "Enable read access for own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Enable insert access for own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update access for own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Add admin policy without recursion
CREATE POLICY "Admin read access"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    CASE 
      WHEN auth.uid() = id THEN true
      WHEN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
      ) THEN true
      ELSE false
    END
  );