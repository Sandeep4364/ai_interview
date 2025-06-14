import React, { useEffect, useState } from 'react';
import { Volume2, Pause, Play } from 'lucide-react';
import { Question } from '../types/interview';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

type QuestionDisplayProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
};

export function QuestionDisplay({ question, questionNumber, totalQuestions }: QuestionDisplayProps) {
  const { speak, stop, isSpeaking, settings } = useVoiceAssistant();
  const [hasSpoken, setHasSpoken] = useState(false);

  useEffect(() => {
    if (settings.enabled && !hasSpoken) {
      const intro = `Question ${questionNumber} of ${totalQuestions}.`;
      speak(intro, { emotion: 'neutral', priority: true });
      
      // Add a slight pause before the question
      setTimeout(() => {
        speak(question.text, { emotion: 'questioning' });
      }, 1500);
      
      setHasSpoken(true);
    }

    return () => {
      stop();
    };
  }, [question.text, questionNumber, totalQuestions, speak, settings.enabled, hasSpoken, stop]);

  const handleVoiceControl = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(question.text, { emotion: 'questioning' });
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleVoiceControl}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-110"
            title={isSpeaking ? "Stop reading" : "Read question aloud"}
          >
            {isSpeaking ? (
              <Pause className="h-5 w-5 text-indigo-600" />
            ) : (
              <Play className="h-5 w-5 text-gray-600" />
            )}
          </button>
          <span className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
            question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        </div>
      </div>
      <p className="text-lg font-medium text-gray-900 leading-relaxed">{question.text}</p>
      <div className="mt-4 flex items-center">
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {question.category}
        </span>
      </div>
    </div>
  );
}