export type Question = {
  id: string;
  text: string;
  category: 'behavioral' | 'technical' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
};

export type ResponseAnalysis = {
  score: number;
  feedback: string;
};

export type CommunicationAnalysis = {
  score: number;
  feedback: string;
  metrics?: {
    pace: number;
    clarity: number;
    fillerWords: number;
  };
};

export type BodyLanguageAnalysis = {
  score: number;
  feedback: string;
  metrics?: {
    eyeContact: number;
    posture: number;
    gestures: number;
    facialExpressions: number;
  };
};

export type InterviewResult = {
  question: Question;
  answer: string;
  duration: number;
  analysis: {
    response: ResponseAnalysis;
    communication: CommunicationAnalysis;
    bodyLanguage: BodyLanguageAnalysis;
    overall: number;
  };
};

export type InterviewSession = {
  id: string;
  date: string;
  overall_score: number;
  results: InterviewResult[];
};

export type InterviewState = {
  currentQuestionIndex: number;
  isRecording: boolean;
  hasVideoPermission: boolean;
  hasAudioPermission: boolean;
  mediaStream: MediaStream | null;
  recordedChunks: Blob[];
};