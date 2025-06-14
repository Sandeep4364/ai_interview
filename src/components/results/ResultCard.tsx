import React from 'react';
import { ResponseAnalysis, CommunicationAnalysis, BodyLanguageAnalysis } from '../../types/interview';
import { FeedbackCard } from '../FeedbackCard';

type ResultCardProps = {
  questionNumber: number;
  questionText: string;
  response: ResponseAnalysis;
  communication: CommunicationAnalysis;
  bodyLanguage: BodyLanguageAnalysis;
};

export function ResultCard({
  questionNumber,
  questionText,
  response,
  communication,
  bodyLanguage
}: ResultCardProps) {
  return (
    <div className="border-t pt-8">
      <h3 className="text-xl font-semibold mb-4">
        Question {questionNumber}: {questionText}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeedbackCard
          title="Response Quality"
          score={response.score}
          feedback={response.feedback}
          icon={response.score >= 80 ? 'positive' : 'neutral'}
        />
        <FeedbackCard
          title="Communication"
          score={communication.score}
          feedback={communication.feedback}
          icon={communication.score >= 80 ? 'positive' : 'neutral'}
        />
        <FeedbackCard
          title="Body Language"
          score={bodyLanguage.score}
          feedback={bodyLanguage.feedback}
          icon={bodyLanguage.score >= 80 ? 'positive' : 'neutral'}
        />
      </div>
    </div>
  );
}