import React, { memo } from 'react';

type VideoOverlayProps = {
  isRecording: boolean;
};

export const VideoOverlay = memo(function VideoOverlay({ isRecording }: VideoOverlayProps) {
  if (!isRecording) return null;

  return (
    <div className="absolute top-4 right-4 flex items-center bg-black/50 px-3 py-1 rounded-full">
      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2" />
      <span className="text-white text-sm font-medium">Recording</span>
    </div>
  );
});