import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle, CheckCircle } from 'lucide-react';

export function ForgotPasswordForm({ onCancel }: { onCancel: () => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Check your email</h3>
        <p className="text-gray-600 mb-4">
          We've sent a password reset link to {email}. Click the link in the email to reset your password.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          The link will redirect you to a secure page where you can set your new password.
        </p>
        <button
          onClick={onCancel}
          className="text-indigo-600 hover:text-indigo-500"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Reset your password</h3>
        <p className="text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send reset link'}
        </button>
      </div>
    </form>
  );
}