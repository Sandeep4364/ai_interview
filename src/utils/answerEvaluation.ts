interface AnswerEvaluation {
  score: number;
  feedback: string[];
  matchedKeywords: string[];
  matchedConcepts: string[];
}

export function evaluateAnswer(
  answer: string,
  expectedKeywords: string[],
  domainConcepts: string[]
): AnswerEvaluation {
  const answerLower = answer.toLowerCase();
  const words = answerLower.split(/\s+/);
  
  // Find matched keywords and concepts
  const matchedKeywords = expectedKeywords.filter(keyword => 
    answerLower.includes(keyword.toLowerCase())
  );
  
  const matchedConcepts = domainConcepts.filter(concept =>
    answerLower.includes(concept.toLowerCase())
  );

  // Calculate scores
  const keywordScore = (matchedKeywords.length / expectedKeywords.length) * 100;
  const conceptScore = (matchedConcepts.length / domainConcepts.length) * 100;
  
  // Calculate final score (weighted average)
  const finalScore = Math.round((keywordScore * 0.6) + (conceptScore * 0.4));

  // Generate feedback
  const feedback = [];
  
  if (finalScore >= 90) {
    feedback.push('Excellent answer that demonstrates deep domain knowledge');
  } else if (finalScore >= 70) {
    feedback.push('Good answer with solid understanding of key concepts');
  } else {
    feedback.push('Consider incorporating more domain-specific concepts');
  }

  // Add specific feedback about missing important keywords
  const missingKeywords = expectedKeywords.filter(
    keyword => !matchedKeywords.includes(keyword)
  );
  if (missingKeywords.length > 0) {
    feedback.push(`Consider discussing: ${missingKeywords.join(', ')}`);
  }

  return {
    score: finalScore,
    feedback,
    matchedKeywords,
    matchedConcepts
  };
}