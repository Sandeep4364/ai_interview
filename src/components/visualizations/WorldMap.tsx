import React from 'react';

export function WorldMap() {
  return (
    <div className="relative aspect-[2/1] bg-gray-100 rounded-lg overflow-hidden">
      {/* Simplified world map visualization using a grid of dots */}
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-10">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className={`
              ${Math.random() > 0.5 ? 'bg-indigo-600' : 'bg-indigo-200'}
              rounded-full w-2 h-2 m-1
              transform transition-all duration-500 hover:scale-150
            `}
          />
        ))}
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50" />
    </div>
  );
}