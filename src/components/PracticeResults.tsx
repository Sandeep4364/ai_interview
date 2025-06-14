import React, { useState } from 'react';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';
import { usePracticeHistory } from '../hooks/usePracticeHistory';
import { ResultCard } from './results/ResultCard';
import { InterviewResult } from '../types/interview';

interface PracticeResultsProps {
  results: InterviewResult[];
  onStartNewSession: () => void;
}

export function PracticeResults({ results, onStartNewSession }: PracticeResultsProps) {
  const { addSession } = usePracticeHistory();
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const overallScore = Math.round(
    results.reduce((acc, result) => acc + result.analysis.overall, 0) / results.length
  );

  React.useEffect(() => {
    const saveSession = async () => {
      if (results.length > 0 && !isSaving) {
        setIsSaving(true);
        try {
          await addSession(results);
        } catch (err) {
          setError('Failed to save session. Your results are still available but may not be saved for later viewing.');
        } finally {
          setIsSaving(false);
        }
      }
    };

    saveSession();
  }, [results, addSession]);

  const downloadResults = () => {
    const data = JSON.stringify(results, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview-practice-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Practice Session Complete</h2>
          <p className="mt-2 text-xl text-gray-600">Overall Score: {overallScore}%</p>
        </div>

        <div className="space-y-8">
          {results.map((result, index) => (
            <ResultCard
              key={index}
              questionNumber={index + 1}
              questionText={result.question.text}
              response={result.analysis.response}
              communication={result.analysis.communication}
              bodyLanguage={result.analysis.bodyLanguage}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={onStartNewSession}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Start New Session
          </button>
          <button
            onClick={downloadResults}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Results
          </button>
        </div>
      </div>
    </div>
  );
}