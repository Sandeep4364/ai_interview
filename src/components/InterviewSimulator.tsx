import React, { useState, useCallback } from 'react';
import { Video, Mic, PauseCircle } from 'lucide-react';
import { InterviewFeedback } from './InterviewFeedback';
import { VideoPreview } from './VideoPreview';
import { QuestionDisplay } from './QuestionDisplay';
import { useMediaRecording } from '../hooks/useMediaRecording';
import { interviewQuestions } from '../data/questions';
import type { InterviewState } from '../types/interview';

export function InterviewSimulator() {
  const [state, setState] = useState<InterviewState>({
    currentQuestionIndex: 0,
    isRecording: false,
    hasVideoPermission: false,
    hasAudioPermission: false,
    mediaStream: null,
    recordedChunks: [],
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    permissions,
    recordedChunks,
    startRecording,
    stopRecording,
    cleanupMedia,
  } = useMediaRecording();

  const handleStartInterview = useCallback(async () => {
    await startRecording();
    setState(prev => ({ ...prev, isRecording: true }));
  }, [startRecording]);

  const handleStopInterview = useCallback(() => {
    stopRecording();
    cleanupMedia();
    setState(prev => ({ ...prev, isRecording: false }));
    setIsCompleted(true);
  }, [stopRecording, cleanupMedia]);

  const handleNextQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: Math.min(
        prev.currentQuestionIndex + 1,
        interviewQuestions.length - 1
      ),
    }));
  }, []);

  if (isCompleted) {
    return <InterviewFeedback />;
  }

  const currentQuestion = interviewQuestions[state.currentQuestionIndex];

  return (
    <div id="practice" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Practice
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Start Your Interview Simulation
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg shadow-lg p-6">
          <VideoPreview
            stream={state.mediaStream}
            isRecording={state.isRecording}
          />

          <div className="mt-6 flex flex-col items-center space-y-6">
            {state.isRecording && (
              <QuestionDisplay
                question={currentQuestion}
                questionNumber={state.currentQuestionIndex + 1}
                totalQuestions={interviewQuestions.length}
              />
            )}

            <div className="flex space-x-4">
              <button
                onClick={() => state.isRecording ? handleStopInterview() : handleStartInterview()}
                className={`flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                  state.isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {state.isRecording ? (
                  <>
                    <PauseCircle className="mr-2 h-5 w-5" />
                    Stop Interview
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-5 w-5" />
                    Start Interview
                  </>
                )}
              </button>
              {state.isRecording && (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  disabled={state.currentQuestionIndex === interviewQuestions.length - 1}
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}