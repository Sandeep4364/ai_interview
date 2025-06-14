import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <div className="flex items-center justify-center text-red-500 mb-4">
              <AlertCircle size={48} />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 text-center">
              We're sorry, but something went wrong. Please try refreshing the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}