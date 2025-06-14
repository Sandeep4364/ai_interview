import React from 'react';

interface LineChartProps {
  data: number[];
}

export function LineChart({ data }: LineChartProps) {
  if (data.length === 0) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 300;
    const y = 100 - ((value - min) / range) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-40">
      <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="0"
            y1={25 * i}
            x2="300"
            y2={25 * i}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Line chart */}
        <polyline
          fill="none"
          stroke="#4f46e5"
          strokeWidth="2"
          points={points}
        />
        
        {/* Area under the line */}
        <polyline
          fill="#4f46e510"
          stroke="none"
          points={`0,100 ${points} 300,100`}
        />
      </svg>
    </div>
  );
}