import { VideoFrame } from '../../types/video';

export function detectGestures(currentFrame: VideoFrame, previousFrame: VideoFrame | null) {
  if (!previousFrame) return null;

  const motionData = calculateMotion(currentFrame, previousFrame);
  return analyzeGesturePatterns(motionData);
}

function calculateMotion(current: VideoFrame, previous: VideoFrame) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  canvas.width = current.width;
  canvas.height = current.height;

  // Calculate frame difference
  ctx.drawImage(current, 0, 0);
  const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  ctx.drawImage(previous, 0, 0);
  const previousData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  return {
    motionLevel: calculateMotionLevel(currentData, previousData),
    regions: detectActiveRegions(currentData, previousData)
  };
}

function calculateMotionLevel(current: ImageData, previous: ImageData) {
  let totalDiff = 0;
  const data1 = current.data;
  const data2 = previous.data;

  for (let i = 0; i < data1.length; i += 4) {
    const diff = Math.abs(data1[i] - data2[i]);
    totalDiff += diff;
  }

  return totalDiff / (data1.length / 4);
}

function detectActiveRegions(current: ImageData, previous: ImageData) {
  // Divide frame into regions and detect motion in each
  const regions = {
    hands: false,
    upperBody: false,
    head: false
  };

  // Simple threshold-based detection
  const motionLevel = calculateMotionLevel(current, previous);
  regions.hands = motionLevel > 30;
  regions.upperBody = motionLevel > 20;
  regions.head = motionLevel > 10;

  return regions;
}

function analyzeGesturePatterns(motionData: any) {
  if (!motionData) return null;

  return {
    gestureFrequency: motionData.motionLevel > 20 ? 'active' : 'minimal',
    gestureType: determineGestureType(motionData.regions)
  };
}

function determineGestureType(regions: any) {
  if (regions.hands && !regions.upperBody) return 'hand_gestures';
  if (regions.hands && regions.upperBody) return 'expressive_gestures';
  if (!regions.hands && regions.head) return 'head_movement';
  return 'minimal_movement';
}