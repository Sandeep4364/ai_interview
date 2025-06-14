import { useState, useEffect, useCallback } from 'react';
import { useVideoRecording } from './useVideoRecording';
import { useAudioRecording } from './useAudioRecording';

export function useMediaRecording() {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [permissions, setPermissions] = useState({
    video: false,
    audio: false,
  });

  const { startVideoRecording, stopVideoRecording } = useVideoRecording();
  const { startAudioRecording, stopAudioRecording } = useAudioRecording();

  const requestPermissions = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: true,
      });
      setMediaStream(stream);
      setPermissions({ video: true, audio: true });
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      return null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    const stream = mediaStream || await requestPermissions();
    if (!stream) return;

    const videoTrack = stream.getVideoTracks()[0];
    const audioTrack = stream.getAudioTracks()[0];

    if (videoTrack) {
      startVideoRecording(stream);
    }
    if (audioTrack) {
      startAudioRecording(stream);
    }
  }, [mediaStream, requestPermissions, startVideoRecording, startAudioRecording]);

  const stopRecording = useCallback(() => {
    stopVideoRecording();
    stopAudioRecording();
  }, [stopVideoRecording, stopAudioRecording]);

  const cleanupMedia = useCallback(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setRecordedChunks([]);
  }, [mediaStream]);

  useEffect(() => {
    return () => {
      cleanupMedia();
    };
  }, [cleanupMedia]);

  return {
    permissions,
    recordedChunks,
    startRecording,
    stopRecording,
    cleanupMedia,
    mediaStream,
  };
}