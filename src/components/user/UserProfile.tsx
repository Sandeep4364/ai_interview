import React from 'react';
import { Mail, User as UserIcon, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';

export function UserProfile({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
            <UserIcon className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{profile?.full_name}</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-gray-900">
                {new Date(profile?.created_at || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}