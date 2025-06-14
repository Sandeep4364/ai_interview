import React from 'react';
import { FeedbackCard } from './FeedbackCard';
import { Download, Share2 } from 'lucide-react';

type FeedbackData = {
  overallScore: number;
  categories: {
    responses: {
      score: number;
      feedback: string;
    };
    communication: {
      score: number;
      feedback: string;
    };
    bodyLanguage: {
      score: number;
      feedback: string;
    };
  };
};

const mockFeedback: FeedbackData = {
  overallScore: 85,
  categories: {
    responses: {
      score: 90,
      feedback: "Strong, detailed answers with relevant examples. Consider being more concise in some responses."
    },
    communication: {
      score: 85,
      feedback: "Clear articulation and good pace. Work on reducing filler words like 'um' and 'uh'."
    },
    bodyLanguage: {
      score: 80,
      feedback: "Good eye contact and posture. Try to incorporate more hand gestures to emphasize key points."
    }
  }
};

export function InterviewFeedback() {
  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Interview Performance</h2>
          <p className="mt-2 text-gray-600">
            Overall Score: {mockFeedback.overallScore}%
          </p>
        </div>

        <div className="space-y-6">
          <FeedbackCard
            title="Response Quality"
            score={mockFeedback.categories.responses.score}
            feedback={mockFeedback.categories.responses.feedback}
            icon="positive"
          />
          <FeedbackCard
            title="Communication Skills"
            score={mockFeedback.categories.communication.score}
            feedback={mockFeedback.categories.communication.feedback}
            icon="neutral"
          />
          <FeedbackCard
            title="Body Language"
            score={mockFeedback.categories.bodyLanguage.score}
            feedback={mockFeedback.categories.bodyLanguage.feedback}
            icon="neutral"
          />
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <Download className="h-5 w-5 mr-2" />
            Download Report
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
            <Share2 className="h-5 w-5 mr-2" />
            Share Feedback
          </button>
        </div>
      </div>
    </div>
  );
}