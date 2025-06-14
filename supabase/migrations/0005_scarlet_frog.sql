/*
  # Add delete policy for practice sessions

  1. Changes
    - Add RLS policy to allow users to delete their own practice sessions
*/

-- Allow users to delete their own sessions
CREATE POLICY "Users can delete own sessions"
  ON practice_sessions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);