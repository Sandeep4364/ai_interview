import React, { useRef, useEffect, memo } from 'react';
import { VideoOverlay } from './video/VideoOverlay';

type VideoPreviewProps = {
  stream: MediaStream | null;
  isRecording: boolean;
};

export const VideoPreview = memo(function VideoPreview({ stream, isRecording }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full aspect-video bg-gray-800 rounded-lg object-cover"
      />
      <VideoOverlay isRecording={isRecording} />
    </div>
  );
});