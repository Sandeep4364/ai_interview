import React, { useRef, useEffect } from 'react';
import { Camera, CameraOff } from 'lucide-react';
import { useVideoStream } from '../../hooks/useVideoStream';

interface VideoRecorderProps {
  isRecording: boolean;
  onVideoFrame: (frame: ImageData) => void;
}

export function VideoRecorder({ isRecording, onVideoFrame }: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { stream, error } = useVideoStream();
  
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (!isRecording || !videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const captureFrame = () => {
      if (!videoRef.current) return;
      
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);
      
      const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      onVideoFrame(frameData);
    };

    const intervalId = setInterval(captureFrame, 1000); // Capture every second
    return () => clearInterval(intervalId);
  }, [isRecording, onVideoFrame]);

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 flex items-center">
        <CameraOff className="h-5 w-5 mr-2" />
        <span>Failed to access camera: {error.message}</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full rounded-lg bg-gray-900"
      />
      <canvas ref={canvasRef} className="hidden" />
      {isRecording && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
          Recording
        </div>
      )}
    </div>
  );
}