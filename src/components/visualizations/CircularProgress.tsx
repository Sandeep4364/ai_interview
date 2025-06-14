import React from 'react';

interface CircularProgressProps {
  percentage: number;
  color?: string;
}

export function CircularProgress({ percentage, color = 'text-indigo-600' }: CircularProgressProps) {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.5s ease'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
      </div>
    </div>
  );
}