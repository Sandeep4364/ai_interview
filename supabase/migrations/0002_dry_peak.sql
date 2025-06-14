/*
  # Add INSERT policy for profiles table

  1. Changes
    - Add INSERT policy to allow authenticated users to create their own profile
    
  2. Security
    - Users can only insert their own profile data
    - Profile ID must match the authenticated user's ID
*/

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);