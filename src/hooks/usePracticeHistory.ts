import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { handleApiError } from '../utils/errorHandling';

export type PracticeSession = {
  id: string;
  date: string;
  overall_score: number;
  questions: any[];
  results: Array<{
    question: {
      text: string;
      category: string;
    };
    analysis: {
      response: { score: number; feedback: string };
      communication: { score: number; feedback: string };
      bodyLanguage: { score: number; feedback: string };
      overall: number;
    };
  }>;
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export function usePracticeHistory() {
  const [history, setHistory] = useState<PracticeSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const loadHistory = useCallback(async () => {
    if (!user) return;
    
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('practice_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (fetchError) throw fetchError;
      setHistory(data || []);
    } catch (err) {
      const handledError = handleApiError(err);
      setError(handledError);
      console.error('Error loading practice history:', handledError);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadHistory();
    } else {
      setHistory([]);
      setIsLoading(false);
    }
  }, [user, loadHistory]);

  const addSession = async (results: any[], retryCount = 0): Promise<void> => {
    if (!user) {
      throw new Error('User must be logged in to save practice session');
    }

    try {
      const overallScore = Math.round(
        results.reduce((acc, result) => acc + result.analysis.overall, 0) / results.length
      );

      const sessionData = {
        user_id: user.id,
        date: new Date().toISOString(),
        questions: results.map(r => r.question),
        results: results,
        overall_score: overallScore
      };

      const { data, error: insertError } = await supabase
        .from('practice_sessions')
        .insert([sessionData])
        .select()
        .single();

      if (insertError) throw insertError;
      
      if (data) {
        setHistory(prev => [data, ...prev]);
        setError(null);
      }
    } catch (err) {
      if (retryCount < MAX_RETRIES) {
        // Exponential backoff
        const delay = RETRY_DELAY * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return addSession(results, retryCount + 1);
      }

      const handledError = handleApiError(err);
      setError(handledError);
      console.error('Error saving practice session:', handledError);
      throw handledError;
    }
  };

  const deleteSession = async (sessionId: string): Promise<void> => {
    if (!user) {
      throw new Error('User must be logged in to delete practice session');
    }

    try {
      setError(null);
      const { error: deleteError } = await supabase
        .from('practice_sessions')
        .delete()
        .eq('id', sessionId)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setHistory(prev => prev.filter(session => session.id !== sessionId));
    } catch (err) {
      const handledError = handleApiError(err);
      setError(handledError);
      console.error('Error deleting practice session:', handledError);
      throw handledError;
    }
  };

  return {
    history,
    addSession,
    deleteSession,
    isLoading,
    error,
    refresh: loadHistory
  };
}