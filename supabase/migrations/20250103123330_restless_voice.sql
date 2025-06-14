/*
  # Company Questions Schema

  1. New Tables
    - `company_questions`
      - `id` (uuid, primary key)
      - `company_id` (text, references companies)
      - `question_text` (text)
      - `category` (text)
      - `difficulty` (text)
      - `expected_keywords` (text[])
      - `domain_concepts` (text[])
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `company_questions` table
    - Add policy for authenticated users to read questions
*/

CREATE TABLE IF NOT EXISTS company_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id text NOT NULL,
  question_text text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  expected_keywords text[] NOT NULL,
  domain_concepts text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE company_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read company questions"
  ON company_questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample questions for different companies
INSERT INTO company_questions (company_id, question_text, category, difficulty, expected_keywords, domain_concepts) VALUES
-- Google Questions
('google', 'Explain how you would design Google''s search autocomplete feature', 'system_design', 'hard', 
  ARRAY['trie', 'distributed systems', 'caching', 'ranking', 'latency'],
  ARRAY['data structures', 'scalability', 'real-time systems']),
('google', 'How would you improve Google Maps'' traffic prediction algorithm?', 'technical', 'hard',
  ARRAY['machine learning', 'data analysis', 'real-time', 'historical data'],
  ARRAY['algorithms', 'ML', 'big data']),
('google', 'Describe a situation where you had to make a difficult technical decision', 'behavioral', 'medium',
  ARRAY['decision making', 'impact', 'collaboration', 'technical leadership'],
  ARRAY['leadership', 'problem solving']),

-- Microsoft Questions
('microsoft', 'How would you design a real-time collaboration feature for Microsoft Word?', 'system_design', 'hard',
  ARRAY['operational transform', 'websockets', 'conflict resolution', 'state management'],
  ARRAY['distributed systems', 'real-time collaboration']),
('microsoft', 'Explain how you would implement a feature in Azure to auto-scale resources', 'technical', 'hard',
  ARRAY['cloud computing', 'metrics', 'thresholds', 'monitoring'],
  ARRAY['cloud architecture', 'automation']),
('microsoft', 'Tell me about a time you improved a critical system''s performance', 'behavioral', 'medium',
  ARRAY['optimization', 'metrics', 'impact', 'collaboration'],
  ARRAY['performance', 'engineering']),

-- Amazon Questions
('amazon', 'Design a system like Amazon''s recommendation engine', 'system_design', 'hard',
  ARRAY['machine learning', 'personalization', 'scalability', 'data processing'],
  ARRAY['ML', 'big data', 'recommendations']),
('amazon', 'How would you optimize Amazon''s warehouse picking algorithm?', 'technical', 'hard',
  ARRAY['optimization', 'routing', 'efficiency', 'constraints'],
  ARRAY['algorithms', 'logistics']),
('amazon', 'Tell me about a time you dealt with a production issue', 'behavioral', 'medium',
  ARRAY['problem solving', 'incident response', 'root cause', 'resolution'],
  ARRAY['operations', 'crisis management']);