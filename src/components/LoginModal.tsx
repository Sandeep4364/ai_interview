import React from 'react';
import { X } from 'lucide-react';
import { SignInForm } from './auth/SignInForm';

type LoginModalProps = {
  onClose: () => void;
};

export function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Login</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <SignInForm />
      </div>
    </div>
  );
}