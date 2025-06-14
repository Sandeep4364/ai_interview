const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'sort of', 'kind of'];
const PAUSE_PATTERN = /\.{3,}|\s{3,}/g;

export function analyzeCommunication(transcript: string, duration: number): {
  score: number;
  feedback: string;
} {
  const words = transcript.toLowerCase().split(' ');
  const totalWords = words.length;
  
  // Calculate speaking pace
  const wordsPerMinute = (totalWords / duration) * 60;
  const paceScore = getPaceScore(wordsPerMinute);

  // Count filler words
  const fillerCount = countFillerWords(words);
  const fillerScore = 100 - (fillerCount / totalWords) * 100;

  // Analyze pauses
  const pauseCount = (transcript.match(PAUSE_PATTERN) || []).length;
  const pauseScore = 100 - (pauseCount * 5);

  // Calculate final score
  const finalScore = Math.round((paceScore + fillerScore + pauseScore) / 3);

  return {
    score: finalScore,
    feedback: getCommunicationFeedback(finalScore, wordsPerMinute, fillerCount)
  };
}

function getPaceScore(wordsPerMinute: number): number {
  if (wordsPerMinute < 120) return 70; // Too slow
  if (wordsPerMinute > 180) return 70; // Too fast
  return 100; // Optimal pace
}

function countFillerWords(words: string[]): number {
  return words.filter(word => FILLER_WORDS.includes(word)).length;
}

function getCommunicationFeedback(score: number, pace: number, fillers: number): string {
  let feedback = '';
  
  if (pace < 120) {
    feedback += 'Try speaking a bit faster. ';
  } else if (pace > 180) {
    feedback += 'Slow down your speaking pace. ';
  }

  if (fillers > 5) {
    feedback += `Reduce filler words (${fillers} detected). `;
  }

  if (score >= 90) {
    feedback += 'Excellent communication style!';
  } else if (score >= 75) {
    feedback += 'Good clarity and flow.';
  } else {
    feedback += 'Focus on speaking more confidently.';
  }

  return feedback;
}