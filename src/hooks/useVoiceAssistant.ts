import { useState, useCallback, useRef } from 'react';

export interface VoiceSettings {
  enabled: boolean;
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
  useEmotions: boolean;
  personality: 'professional' | 'friendly' | 'energetic';
}

export function useVoiceAssistant() {
  const [settings, setSettings] = useState<VoiceSettings>({
    enabled: true,
    voice: null,
    rate: 1,
    pitch: 1,
    volume: 1,
    useEmotions: true,
    personality: 'professional'
  });

  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  const applyPersonality = (utterance: SpeechSynthesisUtterance) => {
    switch (settings.personality) {
      case 'friendly':
        utterance.pitch = settings.pitch * 1.1;
        utterance.rate = settings.rate * 0.95;
        break;
      case 'energetic':
        utterance.pitch = settings.pitch * 1.2;
        utterance.rate = settings.rate * 1.1;
        break;
      default: // professional
        utterance.pitch = settings.pitch;
        utterance.rate = settings.rate;
    }
  };

  const addEmotionalCues = (text: string) => {
    if (!settings.useEmotions) return text;

    // Add subtle pauses and emphasis based on punctuation
    return text
      .replace(/\./g, '... ')
      .replace(/\?/g, '? ... ')
      .replace(/!/g, '! ... ')
      .replace(/,/g, ', ');
  };

  const speak = useCallback((text: string, options: { 
    emotion?: 'neutral' | 'encouraging' | 'questioning',
    priority?: boolean 
  } = {}) => {
    if (!settings.enabled || !window.speechSynthesis) return;

    // Cancel current speech if priority is set
    if (options.priority && currentUtterance.current) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(addEmotionalCues(text));
    
    if (settings.voice) {
      utterance.voice = settings.voice;
    }

    // Apply personality and emotion adjustments
    applyPersonality(utterance);
    utterance.volume = settings.volume;

    // Add emotional inflections
    if (options.emotion === 'encouraging') {
      utterance.pitch *= 1.1;
      utterance.rate *= 0.95;
    } else if (options.emotion === 'questioning') {
      utterance.pitch *= 1.05;
      utterance.rate *= 0.9;
    }

    // Add event handlers for better control
    utterance.onstart = () => {
      currentUtterance.current = utterance;
    };

    utterance.onend = () => {
      currentUtterance.current = null;
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      currentUtterance.current = null;
    };

    window.speechSynthesis.speak(utterance);
  }, [settings]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    currentUtterance.current = null;
  }, []);

  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const getAvailableVoices = useCallback(() => {
    return window.speechSynthesis.getVoices();
  }, []);

  return {
    settings,
    updateSettings,
    speak,
    pause,
    resume,
    stop,
    getAvailableVoices,
    isSpeaking: !!currentUtterance.current
  };
}