import { useState, useCallback } from 'react';

export function useAudioRecording() {
  const [audioRecorder, setAudioRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const startAudioRecording = useCallback((stream: MediaStream) => {
    const audioStream = new MediaStream([stream.getAudioTracks()[0]]);
    const recorder = new MediaRecorder(audioStream, {
      mimeType: 'audio/webm;codecs=opus',
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setAudioChunks((chunks) => [...chunks, event.data]);
      }
    };

    recorder.start();
    setAudioRecorder(recorder);
  }, []);

  const stopAudioRecording = useCallback(() => {
    if (audioRecorder && audioRecorder.state !== 'inactive') {
      audioRecorder.stop();
    }
  }, [audioRecorder]);

  return {
    audioChunks,
    startAudioRecording,
    stopAudioRecording,
  };
}