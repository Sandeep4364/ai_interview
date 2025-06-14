// Response quality analysis
export function analyzeResponseQuality(transcript: string, expectedKeywords: string[]): number {
  const words = transcript.toLowerCase().split(' ');
  let matchCount = 0;
  
  expectedKeywords.forEach(keyword => {
    if (words.includes(keyword.toLowerCase())) {
      matchCount++;
    }
  });

  return Math.round((matchCount / expectedKeywords.length) * 100);
}

export function getResponseFeedback(score: number, questionType: string): string {
  if (score >= 90) {
    return `Outstanding ${questionType} response! You demonstrated comprehensive understanding and provided excellent examples.`;
  } else if (score >= 75) {
    return `Good ${questionType} answer. Consider adding more specific details and examples.`;
  } else if (score >= 60) {
    return `Adequate ${questionType} response. Try to include more key concepts and practical examples.`;
  } else {
    return `Your ${questionType} response needs improvement. Focus on addressing the core aspects of the question.`;
  }
}