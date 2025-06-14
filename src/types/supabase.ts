export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      practice_sessions: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          questions: any;
          results: any;
          overall_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date?: string;
          questions: any;
          results: any;
          overall_score: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          questions?: any;
          results?: any;
          overall_score?: number;
          created_at?: string;
        };
      };
      company_questions: {
        Row: {
          id: string;
          company_id: string;
          question_text: string;
          category: string;
          difficulty: string;
          expected_keywords: string[];
          domain_concepts: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          question_text: string;
          category: string;
          difficulty: string;
          expected_keywords: string[];
          domain_concepts: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          question_text?: string;
          category?: string;
          difficulty?: string;
          expected_keywords?: string[];
          domain_concepts?: string[];
          created_at?: string;
        };
      };
    };
  };
}