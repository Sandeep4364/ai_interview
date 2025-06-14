import React from 'react';
import { Star, ThumbsUp, AlertCircle } from 'lucide-react';

type FeedbackCardProps = {
  title: string;
  score: number;
  feedback: string;
  icon: 'positive' | 'neutral' | 'negative';
};

export function FeedbackCard({ title, score, feedback, icon }: FeedbackCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'positive':
        return <ThumbsUp className="h-6 w-6 text-green-500" />;
      case 'negative':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Star className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        {getIcon()}
        <h3 className="ml-2 text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="mb-4">
        <div className="flex items-center">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700">{score}%</span>
        </div>
      </div>
      <p className="text-gray-600">{feedback}</p>
    </div>
  );
}