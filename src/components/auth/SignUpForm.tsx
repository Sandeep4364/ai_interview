import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle, WifiOff, CheckCircle } from 'lucide-react';

export function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signUp(email, password, fullName);
      setSuccess(true);
    } catch (err: any) {
      const error = err as Error;
      
      // Provide specific error messages based on error type
      if (error.name === 'NetworkError') {
        setError(error.message);
      } else if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (error.message?.includes('Password should be at least')) {
        setError('Password must be at least 6 characters long.');
      } else if (error.message?.includes('Invalid email')) {
        setError('Please enter a valid email address.');
      } else if (error.message?.includes('signup is disabled')) {
        setError('Account creation is currently disabled. Please contact support.');
      } else {
        setError('Failed to create account. Please try again.');
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

  if (success) {
    return (
      <div className="text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Created Successfully!</h3>
        <p className="text-gray-600 mb-4">
          Welcome! Your account has been created and you're now signed in.
        </p>
        <p className="text-sm text-gray-500">
          You can now start practicing your interview skills.
        </p>
      </div>
    );
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
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            minLength={6}
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
        <p className="mt-1 text-sm text-gray-500">Password must be at least 6 characters long</p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                 disabled:opacity-50 transition-all duration-200
                 shadow-lg hover:shadow-xl"
      >
        {isLoading ? 'Creating account...' : 'Sign up'}
      </button>
    </form>
  );
}