import React, { useState, useRef } from 'react';
import { MoreVertical, Settings, User, LogOut, Volume2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { UserProfile } from './UserProfile';
import { VoiceSettingsPanel } from '../settings/VoiceSettings';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { signOut, user } = useAuth();
  
  useOnClickOutside(menuRef, () => setIsOpen(false));

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="User menu"
        >
          <MoreVertical className="h-5 w-5 text-gray-600" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <button
              onClick={() => {
                setIsOpen(false);
                setShowProfile(true);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="h-4 w-4 mr-3" />
              Profile
            </button>
            
            <button
              onClick={() => {
                setIsOpen(false);
                setShowVoiceSettings(true);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Volume2 className="h-4 w-4 mr-3" />
              Voice Settings
            </button>
            
            <button
              onClick={() => {
                setIsOpen(false);
                // Add settings navigation here
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </button>
            
            <div className="border-t border-gray-100 my-1"></div>
            
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign out
            </button>
          </div>
        )}
      </div>

      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
      
      {showVoiceSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Voice Settings</h2>
            <VoiceSettingsPanel />
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowVoiceSettings(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}