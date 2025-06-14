import { useState, useCallback, useRef } from 'react';
import { detectFacialExpressions } from '../utils/videoAnalysis/faceDetection';
import { analyzePosture } from '../utils/videoAnalysis/postureDetection';
import { detectGestures } from '../utils/videoAnalysis/gestureDetection';
import type { VideoFrame } from '../types/video';

export function useBodyLanguageAnalysis() {
  const [analysis, setAnalysis] = useState<any>(null);
  const previousFrameRef = useRef<VideoFrame | null>(null);

  const analyzeFrame = useCallback((frame: VideoFrame) => {
    const facial = detectFacialExpressions(frame);
    const posture = analyzePosture(frame);
    const gestures = detectGestures(frame, previousFrameRef.current);

    previousFrameRef.current = frame;

    const newAnalysis = {
      facial,
      posture,
      gestures,
      timestamp: Date.now()
    };

    setAnalysis(newAnalysis);
    return generateFeedback(newAnalysis);
  }, []);

  return { analyzeFrame, analysis };
}

function generateFeedback(analysis: any) {
  if (!analysis) return null;

  const { facial, posture, gestures } = analysis;
  
  let score = 0;
  const feedback = [];

  // Facial expressions analysis
  if (facial?.engagement === 'high') {
    score += 30;
    feedback.push('Good facial engagement and expressions');
  } else {
    feedback.push('Try to show more engagement through facial expressions');
  }

  // Posture analysis
  if (posture?.alignment === 'good') {
    score += 35;
    feedback.push('Excellent posture and body positioning');
  } else {
    feedback.push('Consider improving your posture');
  }

  // Gesture analysis
  if (gestures?.gestureFrequency === 'active') {
    score += 35;
    feedback.push('Effective use of hand gestures');
  } else {
    feedback.push('Include more natural hand gestures to emphasize points');
  }

  return {
    score,
    feedback: feedback.join('. ') + '.'
  };
}