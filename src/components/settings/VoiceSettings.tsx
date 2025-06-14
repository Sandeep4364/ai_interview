import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Radio, Zap, Briefcase } from 'lucide-react';
import { useVoiceAssistant, VoiceSettings as VoiceSettingsType } from '../../hooks/useVoiceAssistant';

const DEMO_TEXT = "Hello! I'm your interview assistant. I'll help you practice for your technical interviews.";

export function VoiceSettingsPanel() {
  const { settings, updateSettings, getAvailableVoices, speak, stop, isSpeaking } = useVoiceAssistant();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = getAvailableVoices();
      setVoices(availableVoices);
      
      if (!settings.voice && availableVoices.length > 0) {
        updateSettings({ voice: availableVoices[0] });
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      stop();
    };
  }, [getAvailableVoices, settings.voice, updateSettings, stop]);

  const personalityIcons = {
    professional: <Briefcase className="h-5 w-5" />,
    friendly: <Radio className="h-5 w-5" />,
    energetic: <Zap className="h-5 w-5" />
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Voice Assistant</h3>
        <button
          onClick={() => updateSettings({ enabled: !settings.enabled })}
          className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
            settings.enabled ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {settings.enabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Voice Personality</label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {(['professional', 'friendly', 'energetic'] as const).map((personality) => (
              <button
                key={personality}
                onClick={() => updateSettings({ personality })}
                className={`flex items-center justify-center px-4 py-2 border rounded-lg transition-all duration-200 ${
                  settings.personality === personality
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-300 hover:border-indigo-300'
                }`}
              >
                {personalityIcons[personality]}
                <span className="ml-2 capitalize">{personality}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Voice Selection</label>
          <div className="mt-1 relative">
            <select
              value={settings.voice?.name || ''}
              onChange={(e) => {
                const selectedVoice = voices.find(v => v.name === e.target.value);
                updateSettings({ voice: selectedVoice || null });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10"
              disabled={!settings.enabled}
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Speed</label>
              <span className="text-sm text-gray-500">{settings.rate.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate}
              onChange={(e) => updateSettings({ rate: parseFloat(e.target.value) })}
              className="w-full mt-2"
              disabled={!settings.enabled}
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Pitch</label>
              <span className="text-sm text-gray-500">{settings.pitch.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => updateSettings({ pitch: parseFloat(e.target.value) })}
              className="w-full mt-2"
              disabled={!settings.enabled}
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Volume</label>
              <span className="text-sm text-gray-500">{Math.round(settings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => updateSettings({ volume: parseFloat(e.target.value) })}
              className="w-full mt-2"
              disabled={!settings.enabled}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.useEmotions}
              onChange={(e) => updateSettings({ useEmotions: e.target.checked })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              disabled={!settings.enabled}
            />
            <span className="ml-2 text-sm text-gray-700">Use emotional cues</span>
          </label>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => isSpeaking ? stop() : speak(DEMO_TEXT, { emotion: 'encouraging' })}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {isSpeaking ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Stop Preview
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Preview Voice
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}