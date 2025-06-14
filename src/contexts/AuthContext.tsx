import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthError, AuthApiError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        ensureUserProfile(session.user);
      }
      setIsLoading(false);
    });

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await ensureUserProfile(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const ensureUserProfile = async (user: User) => {
    try {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        // Create profile if it doesn't exist
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: user.email || '',
              full_name: user.user_metadata.full_name || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

        if (insertError) {
          console.error('Error creating user profile:', insertError);
          throw insertError;
        }
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error);
    }
  };

  const handleAuthError = (error: Error) => {
    // Handle network errors (Failed to fetch)
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      const networkError = new Error('Unable to connect to the server. Please check your internet connection and try again.');
      networkError.name = 'NetworkError';
      throw networkError;
    }

    // Handle Supabase AuthApiError
    if (error instanceof AuthApiError) {
      if (error.status === 400 && error.message.includes('refresh_token')) {
        // Clear local storage and sign out on refresh token errors
        localStorage.clear();
        signOut().catch(console.error);
        const refreshError = new Error('Your session has expired. Please sign in again.');
        refreshError.name = 'SessionExpiredError';
        throw refreshError;
      }
      
      // Handle invalid credentials
      if (error.status === 400 && error.message.includes('Invalid login credentials')) {
        const credentialsError = new Error('Invalid email or password. Please check your credentials and try again.');
        credentialsError.name = 'InvalidCredentialsError';
        throw credentialsError;
      }

      // Handle signup specific errors
      if (error.status === 422 && error.message.includes('already registered')) {
        const duplicateError = new Error('An account with this email already exists. Please sign in instead.');
        duplicateError.name = 'DuplicateEmailError';
        throw duplicateError;
      }

      if (error.status === 422 && error.message.includes('Password should be at least')) {
        const passwordError = new Error('Password must be at least 6 characters long.');
        passwordError.name = 'WeakPasswordError';
        throw passwordError;
      }

      if (error.status === 400 && error.message.includes('Invalid email')) {
        const emailError = new Error('Please enter a valid email address.');
        emailError.name = 'InvalidEmailError';
        throw emailError;
      }

      if (error.status === 403 && error.message.includes('signup is disabled')) {
        const signupError = new Error('Account creation is currently disabled. Please contact support.');
        signupError.name = 'SignupDisabledError';
        throw signupError;
      }
    }

    // For other auth errors, preserve the original message
    throw error;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      handleAuthError(error as Error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) throw error;

      // If signup is successful and we have a user, create their profile
      if (data.user) {
        await ensureUserProfile(data.user);
      }
    } catch (error) {
      handleAuthError(error as Error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      // Clear any stored auth data
      localStorage.clear();
    } catch (error) {
      handleAuthError(error as Error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (error) {
      handleAuthError(error as Error);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      if (error) throw error;
    } catch (error) {
      handleAuthError(error as Error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signUp, 
      signOut, 
      resetPassword,
      updatePassword, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};