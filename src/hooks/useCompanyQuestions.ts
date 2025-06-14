import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Company } from '../types/company';
import { interviewQuestions } from '../data/questions';

export interface CompanyQuestion {
  id: string;
  question_text: string;
  category: string;
  difficulty: string;
  expected_keywords: string[];
  domain_concepts: string[];
}

export function useCompanyQuestions(company: Company | null) {
  const [questions, setQuestions] = useState<CompanyQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      if (!company) {
        // Use default questions if no company is selected
        setQuestions(interviewQuestions.map(q => ({
          id: q.id,
          question_text: q.text,
          category: q.category,
          difficulty: q.difficulty,
          expected_keywords: ['algorithm', 'design', 'implementation', 'testing'],
          domain_concepts: ['software engineering', 'problem solving']
        })));
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('company_questions')
          .select('*')
          .eq('company_id', company.id)
          .eq('category', 'technical');

        if (error) throw error;
        
        if (data && data.length > 0) {
          setQuestions(data);
        } else {
          // Fallback to default technical questions if no company-specific questions found
          setQuestions(interviewQuestions
            .filter(q => q.category === 'technical')
            .map(q => ({
              id: q.id,
              question_text: q.text,
              category: 'technical',
              difficulty: q.difficulty,
              expected_keywords: ['algorithm', 'design', 'implementation', 'testing'],
              domain_concepts: ['software engineering', 'problem solving']
            }))
          );
        }
      } catch (err) {
        console.error('Error fetching company questions:', err);
        setError('Failed to load questions');
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    fetchQuestions();
  }, [company]);

  return { questions, isLoading, error };
}