import { useState, useCallback } from 'react';
import { analyzeResponseQuality, getResponseFeedback } from '../utils/responseAnalyzer';
import { analyzeCommunication } from '../utils/communicationAnalyzer';
import { analyzeBodyLanguage } from '../utils/bodyLanguageAnalyzer';
import { validateAnswer } from '../utils/answerValidator';

export function useInterviewAnalysis() {
  const [analysis, setAnalysis] = useState(null);

  const analyzeInterview = useCallback((
    transcript: string,
    duration: number,
    videoFrames: ImageData[],
    questionType: string
  ) => {
    // Analyze response quality
    const answerValidation = validateAnswer(transcript, duration, questionType);
    
    // Analyze communication
    const communicationAnalysis = analyzeCommunication(transcript, duration);
    
    // Analyze body language
    const bodyLanguageAnalysis = analyzeBodyLanguage(videoFrames);

    const analysis = {
      response: {
        score: answerValidation.score,
        feedback: answerValidation.feedback,
        isValid: answerValidation.isValid
      },
      communication: communicationAnalysis,
      bodyLanguage: bodyLanguageAnalysis,
      overall: Math.round(
        (answerValidation.score + communicationAnalysis.score + bodyLanguageAnalysis.score) / 3
      )
    };

    setAnalysis(analysis);
    return analysis;
  }, []);

  return { analysis, analyzeInterview };
}