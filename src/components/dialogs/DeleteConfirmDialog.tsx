import React from 'react';
import { AlertTriangle } from 'lucide-react';

type DeleteConfirmDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteConfirmDialog({ onConfirm, onCancel }: DeleteConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Delete Session</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this practice session? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}