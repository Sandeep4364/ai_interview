import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export function useSpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error('Browser does not support speech recognition.');
    }
  }, [browserSupportsSpeechRecognition]);

  const startListening = () => {
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  };
}