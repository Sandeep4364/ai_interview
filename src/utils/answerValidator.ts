interface AnswerCriteria {
  keywords: string[];
  concepts: string[];
  minDuration: number;
  maxDuration: number;
}

export const answerCriteria: Record<string, AnswerCriteria> = {
  technical: {
    keywords: ['algorithm', 'complexity', 'optimization', 'implementation', 'solution'],
    concepts: ['time complexity', 'space complexity', 'edge cases', 'testing'],
    minDuration: 60,
    maxDuration: 180
  },
  behavioral: {
    keywords: ['experience', 'team', 'challenge', 'solution', 'learned'],
    concepts: ['collaboration', 'leadership', 'problem-solving', 'communication'],
    minDuration: 90,
    maxDuration: 180
  },
  situational: {
    keywords: ['approach', 'handle', 'resolve', 'decision', 'outcome'],
    concepts: ['decision-making', 'problem-solving', 'risk assessment', 'communication'],
    minDuration: 60,
    maxDuration: 150
  }
};

export function validateAnswer(
  transcript: string,
  duration: number,
  questionType: string
): {
  isValid: boolean;
  score: number;
  feedback: string;
} {
  const criteria = answerCriteria[questionType];
  if (!criteria) {
    return { isValid: false, score: 0, feedback: 'Unknown question type' };
  }

  const keywordScore = calculateKeywordScore(transcript, criteria.keywords);
  const conceptScore = calculateConceptScore(transcript, criteria.concepts);
  const durationScore = calculateDurationScore(duration, criteria.minDuration, criteria.maxDuration);

  const totalScore = Math.round((keywordScore + conceptScore + durationScore) / 3);

  return {
    isValid: totalScore >= 60,
    score: totalScore,
    feedback: generateAnswerFeedback(totalScore, duration, criteria)
  };
}

function calculateKeywordScore(transcript: string, keywords: string[]): number {
  const words = transcript.toLowerCase().split(' ');
  const matches = keywords.filter(keyword => words.includes(keyword.toLowerCase()));
  return (matches.length / keywords.length) * 100;
}

function calculateConceptScore(transcript: string, concepts: string[]): number {
  const text = transcript.toLowerCase();
  const matches = concepts.filter(concept => text.includes(concept.toLowerCase()));
  return (matches.length / concepts.length) * 100;
}

function calculateDurationScore(actual: number, min: number, max: number): number {
  if (actual < min) return 70;
  if (actual > max) return 70;
  return 100;
}

function generateAnswerFeedback(score: number, duration: number, criteria: AnswerCriteria): string {
  const feedback = [];

  if (duration < criteria.minDuration) {
    feedback.push('Try to elaborate more on your answer');
  } else if (duration > criteria.maxDuration) {
    feedback.push('Try to be more concise');
  }

  if (score >= 90) {
    feedback.push('Excellent answer with comprehensive coverage of key points');
  } else if (score >= 75) {
    feedback.push('Good answer, consider including more specific examples');
  } else if (score >= 60) {
    feedback.push('Adequate answer, but needs more depth and detail');
  } else {
    feedback.push('Answer needs improvement, focus on addressing key concepts');
  }

  return feedback.join('. ') + '.';
}