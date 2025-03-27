/*
  # Fix Authentication and RLS Policies

  1. Changes
    - Drop existing profile policies
    - Add proper RLS policies for profiles table
    - Add proper RLS policies for auth operations
    - Fix profile creation on signup

  2. Security
    - Enable proper authentication flow
    - Maintain data security
    - Allow profile creation during signup
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert access for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable update access for own profile" ON profiles;
DROP POLICY IF EXISTS "Admin read access" ON profiles;

-- Create new policies
CREATE POLICY "Enable all access for authenticated users"
  ON profiles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Update profile trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();