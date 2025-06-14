import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, Database } from 'lucide-react';
import { testConnection } from '../../lib/supabase';

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await testConnection();
      setIsConnected(connected);
      
      // Hide the status after 3 seconds if connected
      if (connected) {
        setTimeout(() => setIsVisible(false), 3000);
      }
    };

    checkConnection();
  }, []);

  if (!isVisible || isConnected === null) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 ${
      isConnected 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      {isConnected ? (
        <>
          <Database className="h-4 w-4" />
          <span className="text-sm font-medium">Database Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">Database Connection Failed</span>
        </>
      )}
    </div>
  );
}