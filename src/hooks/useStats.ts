import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface PracticeStats {
  totalSessions: number;
  averageScore: number;
  totalPracticeTime: number;
  recentTrends: number[];
  questionCategories: {
    behavioral: number;
    technical: number;
    situational: number;
  };
}

export function useStats() {
  const [stats, setStats] = useState<PracticeStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchStats() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setError(null);
        // Fetch practice sessions
        const { data: sessions, error: fetchError } = await supabase
          .from('practice_sessions')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });

        if (fetchError) throw fetchError;

        if (!sessions || sessions.length === 0) {
          setStats({
            totalSessions: 0,
            averageScore: 0,
            totalPracticeTime: 0,
            recentTrends: [],
            questionCategories: {
              behavioral: 0,
              technical: 0,
              situational: 0
            }
          });
          setIsLoading(false);
          return;
        }

        // Calculate statistics
        const totalSessions = sessions.length;
        const averageScore = Math.round(
          sessions.reduce((acc, session) => acc + session.overall_score, 0) / totalSessions
        );

        // Calculate total practice time (assuming each session takes ~15 minutes)
        const totalPracticeTime = totalSessions * 15;

        // Get recent scores for trends (last 10 sessions)
        const recentTrends = sessions
          .slice(0, 10)
          .map(session => session.overall_score);

        // Count questions by category
        const questionCategories = sessions.reduce((acc, session) => {
          if (session.questions && Array.isArray(session.questions)) {
            session.questions.forEach((q: any) => {
              if (q.category) {
                acc[q.category.toLowerCase()] = (acc[q.category.toLowerCase()] || 0) + 1;
              }
            });
          }
          return acc;
        }, { behavioral: 0, technical: 0, situational: 0 });

        setStats({
          totalSessions,
          averageScore,
          totalPracticeTime,
          recentTrends,
          questionCategories
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [user]);

  return { stats, isLoading, error };
}