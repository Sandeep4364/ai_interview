import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { DashboardStats } from '../DashboardStats';

export function SlideOutPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX < 20) {
        setShowTrigger(true);
      } else if (e.clientX > 400 && !isOpen) {
        timeout = setTimeout(() => setShowTrigger(false), 300);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger area */}
      {showTrigger && !isOpen && (
        <div
          className="fixed left-0 top-1/2 -translate-y-1/2 w-2 h-32 bg-indigo-500/10 
                     hover:bg-indigo-500/20 transition-colors duration-200 cursor-pointer
                     rounded-r-md z-50"
          onMouseEnter={() => setIsOpen(true)}
        />
      )}

      {/* Dashboard panel */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl transition-transform 
                   duration-300 ease-in-out transform z-50 w-[400px] overflow-y-auto
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="p-6">
            <DashboardStats />
          </div>
        </div>
      </div>
    </>
  );
}