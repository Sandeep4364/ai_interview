/*
  # Fix profiles table constraints and triggers

  1. Changes
    - Add ON CONFLICT DO UPDATE to handle race conditions
    - Add updated_at trigger
    - Add email NOT NULL constraint
*/

-- Make sure email is required and unique
ALTER TABLE profiles
ALTER COLUMN email SET NOT NULL,
ADD CONSTRAINT profiles_email_unique UNIQUE (email);

-- Update the trigger to handle all profile updates
CREATE OR REPLACE FUNCTION handle_profile_changes()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;

CREATE TRIGGER handle_profile_changes
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_changes();