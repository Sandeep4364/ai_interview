import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidResetLink, setIsValidResetLink] = useState(false);
  const { updatePassword } = useAuth();

  useEffect(() => {
    // Check if we have the proper parameters for password reset
    const checkResetLink = () => {
      const currentHash = window.location.hash;
      const urlParams = new URLSearchParams(window.location.search);
      
      // Check hash parameters (Supabase format)
      if (currentHash.includes('type=recovery') && currentHash.includes('access_token')) {
        setIsValidResetLink(true);
        return;
      }
      
      // Check URL search parameters
      if (urlParams.get('type') === 'recovery' && urlParams.get('access_token')) {
        setIsValidResetLink(true);
        return;
      }
      
      // Check if hash contains access_token (alternative format)
      if (currentHash.includes('access_token=')) {
        setIsValidResetLink(true);
        return;
      }
      
      setError('Invalid or expired reset link. Please request a new password reset.');
    };

    checkResetLink();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidResetLink) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      await updatePassword(password);
      setSuccess(true);
    } catch (err) {
      const error = err as Error;
      if (error.message.includes('session') || error.message.includes('expired')) {
        setError('Your reset session has expired. Please request a new password reset.');
      } else {
        setError('Failed to update password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    // Clear the URL and redirect to home
    window.history.replaceState({}, document.title, '/');
    window.location.reload();
  };

  if (success) {
    return (
      <div className="min-h-screen relative">
        {/* Background */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80")',
            filter: 'brightness(0.9)',
            zIndex: -1
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 to-black/50 backdrop-blur-sm"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white/90 backdrop-blur-sm py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Updated!</h2>
                <p className="text-gray-600 mb-6">
                  Your password has been successfully updated. You can now sign in with your new password.
                </p>
                <button
                  onClick={handleBackToSignIn}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                           text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                           transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Go to Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.9)',
          zIndex: -1
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 to-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-200">
            Enter your new password below
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/90 backdrop-blur-sm py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-3 rounded-lg border-gray-300 bg-white/50 backdrop-blur-sm
                             shadow-sm transition-all duration-200
                             focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                             hover:bg-white/70 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-4 py-3 rounded-lg border-gray-300 bg-white/50 backdrop-blur-sm
                             shadow-sm transition-all duration-200
                             focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                             hover:bg-white/70 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !isValidResetLink}
                className="w-full flex justify-center py-3 px-4 border border-transparent 
                         rounded-lg text-sm font-medium text-white bg-indigo-600 
                         hover:bg-indigo-700 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 
                         transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? 'Updating Password...' : 'Update Password'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBackToSignIn}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}