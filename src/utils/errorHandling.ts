export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public userMessage: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleApiError(error: any): AppError {
  console.error('API Error:', error);
  
  if (error instanceof AppError) {
    return error;
  }

  // Network errors
  if (error.message === 'Failed to fetch') {
    return new AppError(
      'Network request failed',
      'NETWORK_ERROR',
      'Unable to connect to the server. Please check your internet connection.'
    );
  }

  // Supabase specific errors
  if (error.code === '23503') {
    return new AppError(
      'Database constraint violation',
      'DB_ERROR',
      'There was an error saving your data. Please try again.'
    );
  }

  // Default error
  return new AppError(
    'Unknown error occurred',
    'UNKNOWN_ERROR',
    'An unexpected error occurred. Please try again.'
  );
}