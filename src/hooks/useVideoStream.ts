import { useState, useEffect, useCallback } from 'react';

export function useVideoStream() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const initializeStream = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        }
      });
      setStream(mediaStream);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to access camera'));
    }
  }, []);

  useEffect(() => {
    initializeStream();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return { stream, error };
}