import React from 'react';
import { Clock, X, Trash2 } from 'lucide-react';
import { usePracticeHistory } from '../hooks/usePracticeHistory';
import { DeleteConfirmDialog } from './dialogs/DeleteConfirmDialog';

type FeedbackHistoryProps = {
  onClose: () => void;
};

export function FeedbackHistory({ onClose }: FeedbackHistoryProps) {
  const { history, isLoading, deleteSession } = usePracticeHistory();
  const [sessionToDelete, setSessionToDelete] = React.useState<string | null>(null);

  const handleDelete = async () => {
    if (!sessionToDelete) return;
    
    try {
      await deleteSession(sessionToDelete);
      setSessionToDelete(null); // Clear the session to delete after successful deletion
    } catch (error) {
      console.error('Failed to delete session:', error);
      // You could add error handling UI here
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Practice History</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No practice sessions yet.</p>
        ) : (
          <div className="space-y-8">
            {history.map((session) => (
              <div key={session.id} className="border-b pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{new Date(session.date).toLocaleString()}</span>
                  <span className="ml-auto font-semibold text-indigo-600">
                    Score: {session.overall_score}%
                  </span>
                  <button
                    onClick={() => setSessionToDelete(session.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                    title="Delete session"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Session results */}
                {session.results.map((result: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Question {index + 1}: {result.question.text}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-sm font-medium">Response Quality</p>
                        <p className="text-2xl font-bold text-indigo-600">
                          {result.analysis.response.score}%
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-sm font-medium">Communication</p>
                        <p className="text-2xl font-bold text-indigo-600">
                          {result.analysis.communication.score}%
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-sm font-medium">Body Language</p>
                        <p className="text-2xl font-bold text-indigo-600">
                          {result.analysis.bodyLanguage.score}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {sessionToDelete && (
        <DeleteConfirmDialog
          onConfirm={handleDelete}
          onCancel={() => setSessionToDelete(null)}
        />
      )}
    </div>
  );
}