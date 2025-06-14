import React from 'react';
import { Brain, Video, MessageSquare, BarChart } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Analysis',
    description: 'Advanced natural language processing to evaluate your responses in real-time.',
    icon: Brain
  },
  {
    name: 'Video Analysis',
    description: 'Get feedback on your body language, facial expressions, and non-verbal cues.',
    icon: Video
  },
  {
    name: 'Industry-Specific Questions',
    description: 'Practice with questions tailored to your industry and role.',
    icon: MessageSquare
  },
  {
    name: 'Detailed Feedback',
    description: 'Receive comprehensive feedback and improvement suggestions after each session.',
    icon: BarChart
  }
];

export function Features() {
  return (
    <div id="features" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}