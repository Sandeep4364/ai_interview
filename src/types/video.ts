export interface VideoFrame extends HTMLVideoElement {
  width: number;
  height: number;
  getVideoPlaybackQuality(): VideoPlaybackQuality;
}

export interface BodyLanguageAnalysis {
  score: number;
  feedback: string;
  details: {
    facial: {
      engagement: 'high' | 'low';
      confidence: 'high' | 'moderate' | 'low';
    };
    posture: {
      alignment: 'good' | 'needs_improvement';
      shoulderLevel: 'balanced' | 'uneven';
    };
    gestures: {
      frequency: 'active' | 'minimal';
      type: 'hand_gestures' | 'expressive_gestures' | 'head_movement' | 'minimal_movement';
    };
  };
}