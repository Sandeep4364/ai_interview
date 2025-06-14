import React, { useState } from 'react';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';

export function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen relative">
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.9)',
          zIndex: -1
        }}
      >
        {/* Overlay gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 to-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isSignIn ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/90 backdrop-blur-sm py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            {isSignIn ? <SignInForm /> : <SignUpForm />}
            
            <div className="mt-6">
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                {isSignIn ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}