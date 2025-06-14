import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginModal } from './LoginModal';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = React.useState(!user);

  if (!user) {
    return <LoginModal onClose={() => setShowLoginModal(false)} />;
  }

  return <>{children}</>;
}