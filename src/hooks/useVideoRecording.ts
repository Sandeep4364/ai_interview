import { useState, useCallback } from 'react';

export function useVideoRecording() {
  const [videoRecorder, setVideoRecorder] = useState<MediaRecorder | null>(null);
  const [videoChunks, setVideoChunks] = useState<Blob[]>([]);

  const startVideoRecording = useCallback((stream: MediaStream) => {
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setVideoChunks((chunks) => [...chunks, event.data]);
      }
    };

    recorder.start();
    setVideoRecorder(recorder);
  }, []);

  const stopVideoRecording = useCallback(() => {
    if (videoRecorder && videoRecorder.state !== 'inactive') {
      videoRecorder.stop();
    }
  }, [videoRecorder]);

  return {
    videoChunks,
    startVideoRecording,
    stopVideoRecording,
  };
}