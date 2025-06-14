/*
  # Add practice sessions table

  1. New Tables
    - `practice_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `date` (timestamptz)
      - `questions` (jsonb)
      - `results` (jsonb)
      - `overall_score` (integer)

  2. Security
    - Enable RLS
    - Add policies for user access
*/

CREATE TABLE practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  date timestamptz DEFAULT now(),
  questions jsonb NOT NULL,
  results jsonb NOT NULL,
  overall_score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own sessions
CREATE POLICY "Users can insert own sessions"
  ON practice_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own sessions
CREATE POLICY "Users can read own sessions"
  ON practice_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);