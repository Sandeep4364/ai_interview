interface BodyLanguageMetrics {
  eyeContact: number;
  posture: number;
  gestures: number;
  facialExpressions: number;
}

export function analyzeBodyLanguage(videoFrames: ImageData[]): {
  score: number;
  feedback: string;
  metrics: BodyLanguageMetrics;
} {
  // In a real implementation, this would use computer vision APIs
  // For now, we'll simulate analysis with random but consistent values
  const frameCount = videoFrames.length;
  const seed = frameCount % 100; // Use frame count to generate varied but consistent results

  const metrics = {
    eyeContact: getMetricScore(seed, 'eyeContact'),
    posture: getMetricScore(seed, 'posture'),
    gestures: getMetricScore(seed, 'gestures'),
    facialExpressions: getMetricScore(seed, 'facial')
  };

  const score = Math.round(
    (metrics.eyeContact + metrics.posture + metrics.gestures + metrics.facialExpressions) / 4
  );

  return {
    score,
    feedback: getBodyLanguageFeedback(metrics),
    metrics
  };
}

function getMetricScore(seed: number, metric: string): number {
  // Generate different but consistent scores based on seed and metric
  const hash = (seed + metric.length) % 30;
  return Math.max(60, Math.min(100, 70 + hash));
}

function getBodyLanguageFeedback(metrics: BodyLanguageMetrics): string {
  const feedback = [];

  if (metrics.eyeContact < 70) {
    feedback.push('Maintain more consistent eye contact with the camera');
  }
  if (metrics.posture < 70) {
    feedback.push('Improve your posture by sitting up straighter');
  }
  if (metrics.gestures < 70) {
    feedback.push('Use more natural hand gestures to emphasize points');
  }
  if (metrics.facialExpressions < 70) {
    feedback.push('Show more engagement through facial expressions');
  }

  if (feedback.length === 0) {
    return 'Excellent body language! You appear confident and engaged.';
  }

  return `Areas for improvement: ${feedback.join('. ')}.`;
}