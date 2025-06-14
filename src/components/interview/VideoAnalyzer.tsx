import React, { useCallback, useRef, useEffect } from 'react';
import { useBodyLanguageAnalysis } from '../../hooks/useBodyLanguageAnalysis';
import { VideoFrame } from '../../types/video';

type VideoAnalyzerProps = {
  stream: MediaStream | null;
  onAnalysis: (analysis: any) => void;
};

export function VideoAnalyzer({ stream, onAnalysis }: VideoAnalyzerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { analyzeFrame } = useBodyLanguageAnalysis();
  const analysisIntervalRef = useRef<number>();

  const processVideoFrame = useCallback(() => {
    if (videoRef.current) {
      const analysis = analyzeFrame(videoRef.current as VideoFrame);
      onAnalysis(analysis);
    }
  }, [analyzeFrame, onAnalysis]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      // Analyze every 1 second to avoid performance issues
      analysisIntervalRef.current = window.setInterval(processVideoFrame, 1000);
    }

    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, [stream, processVideoFrame]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="hidden" // Hidden video element for analysis
    />
  );
}