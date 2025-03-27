/*
  # Fix profile policies to prevent recursion

  1. Changes
    - Remove recursive admin policy
    - Use auth.jwt() claims for admin check
    - Simplify policies structure
    - Add proper role-based access

  2. Security
    - Maintain data access security
    - Prevent infinite recursion
    - Enable proper admin access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert access for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable update access for own profile" ON profiles;
DROP POLICY IF EXISTS "Admin read access" ON profiles;

-- Create new non-recursive policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id OR
    auth.jwt()->>'role' = 'admin'
  );

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Add function to set initial role in JWT
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Set role in JWT claims
  UPDATE auth.users
  SET raw_app_meta_data = jsonb_set(
    COALESCE(raw_app_meta_data, '{}'::jsonb),
    '{role}',
    '"user"'
  )
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();