/*
  # Add Technical Interview Questions

  1. Additional Questions
    - Add more technical questions for each company
    - Focus on coding, algorithms, and system design
*/

-- Add more technical questions for Google
INSERT INTO company_questions (company_id, question_text, category, difficulty, expected_keywords, domain_concepts) VALUES
('google', 'Implement a distributed cache system with LRU eviction policy', 'technical', 'hard',
  ARRAY['distributed systems', 'LRU', 'cache', 'consistency', 'synchronization'],
  ARRAY['system design', 'algorithms', 'concurrency']),
('google', 'Design a scalable URL shortening service like goo.gl', 'technical', 'medium',
  ARRAY['hashing', 'database', 'scalability', 'load balancing', 'caching'],
  ARRAY['system design', 'distributed systems']),
('google', 'Implement an efficient algorithm to find duplicate files in a large file system', 'technical', 'medium',
  ARRAY['hash', 'file system', 'optimization', 'memory management'],
  ARRAY['algorithms', 'data structures']),

-- Add technical questions for Microsoft
('microsoft', 'Design a distributed task scheduling system for Azure', 'technical', 'hard',
  ARRAY['distributed systems', 'scheduling', 'fault tolerance', 'consistency'],
  ARRAY['cloud computing', 'system design']),
('microsoft', 'Implement a real-time code collaboration editor', 'technical', 'hard',
  ARRAY['operational transform', 'conflict resolution', 'websockets', 'state management'],
  ARRAY['algorithms', 'real-time systems']),
('microsoft', 'Design a system for handling massive log processing in Azure', 'technical', 'medium',
  ARRAY['log processing', 'stream processing', 'scalability', 'monitoring'],
  ARRAY['cloud architecture', 'big data']),

-- Add technical questions for Amazon
('amazon', 'Design a scalable product inventory system', 'technical', 'hard',
  ARRAY['database', 'consistency', 'caching', 'transactions', 'scalability'],
  ARRAY['distributed systems', 'system design']),
('amazon', 'Implement an efficient algorithm for product recommendations', 'technical', 'medium',
  ARRAY['machine learning', 'collaborative filtering', 'ranking', 'optimization'],
  ARRAY['algorithms', 'ML']),
('amazon', 'Design a distributed rate limiting system', 'technical', 'medium',
  ARRAY['rate limiting', 'distributed systems', 'algorithms', 'consistency'],
  ARRAY['system design', 'scalability']);