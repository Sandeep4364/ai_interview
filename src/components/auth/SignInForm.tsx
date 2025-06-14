import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      const error = err as Error;
      
      // Provide specific error messages based on error type
      if (error.name === 'NetworkError') {
        setError(error.message);
      } else if (error.name === 'InvalidCredentialsError') {
        setError(error.message);
      } else if (error.name === 'SessionExpiredError') {
        setError(error.message);
      } else {
        // Fallback for other errors
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorIcon = () => {
    if (error.includes('connect') || error.includes('network') || error.includes('internet')) {
      return <WifiOff className="h-5 w-5 mr-2" />;
    }
    return <AlertCircle className="h-5 w-5 mr-2" />;
  };

  if (showForgotPassword) {
    return <ForgotPasswordForm onCancel={() => setShowForgotPassword(false)} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center">
          {getErrorIcon()}
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1 relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 rounded-lg border-gray-300 bg-white/50 backdrop-blur-sm
                     shadow-sm transition-all duration-200
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     hover:bg-white/70"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.9))',
            }}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 rounded-lg border-gray-300 bg-white/50 backdrop-blur-sm
                     shadow-sm transition-all duration-200
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     hover:bg-white/70"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.9))',
            }}
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="btn-secondary text-sm text-indigo-600 hover:text-indigo-500"
        >
          Forgot your password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`btn-submit w-full flex justify-center py-3 px-4 border border-transparent 
                   rounded-lg text-sm font-medium text-white bg-indigo-600 
                   hover:bg-indigo-700 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 
                   transition-all duration-200 shadow-lg hover:shadow-xl
                   ${isLoading ? 'btn-loading' : ''}`}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}