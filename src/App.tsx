import React from 'react';
import { Header } from './components/Header';
import { SlideOutPanel } from './components/dashboard/SlideOutPanel';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PracticeSession } from './components/PracticeSession';
import { PracticeResults } from './components/PracticeResults';
import { FeedbackHistory } from './components/FeedbackHistory';
import { AuthPage } from './pages/AuthPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ConnectionStatus } from './components/common/ConnectionStatus';
import { useAuth } from './contexts/AuthContext';
import { Company } from './types/company';
import { useCompanies } from './hooks/useCompanies';

export default function App() {
  const [practiceMode, setPracticeMode] = React.useState<'inactive' | 'practicing' | 'completed'>('inactive');
  const [sessionResults, setSessionResults] = React.useState<any[]>([]);
  const [showHistory, setShowHistory] = React.useState(false);
  const { user, isLoading } = useAuth();
  const { selectCompany } = useCompanies();

  // Check if this is a password reset page
  const isResetPasswordPage = React.useMemo(() => {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    // Check for explicit reset password path
    if (currentPath === '/reset-password') {
      return true;
    }
    
    // Check for Supabase auth hash parameters
    if (currentHash.includes('type=recovery') || currentHash.includes('access_token')) {
      return true;
    }
    
    // Check URL search parameters as well
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('type') === 'recovery') {
      return true;
    }
    
    return false;
  }, []);

  const handleStartPractice = (company: Company) => {
    selectCompany(company);
    setPracticeMode('practicing');
  };

  const handleCompletePractice = (results: any[]) => {
    setSessionResults(results);
    setPracticeMode('completed');
  };

  const handleStartNewSession = () => {
    setPracticeMode('inactive');
    setSessionResults([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show reset password page if it's a reset link
  if (isResetPasswordPage) {
    return <ResetPasswordPage />;
  }

  if (!user) {
    return (
      <>
        <ConnectionStatus />
        <AuthPage />
      </>
    );
  }

  return (
    <div className="min-h-screen relative">
      <ConnectionStatus />
      
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.9)',
          zIndex: -1
        }}
      >
        {/* Overlay gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 to-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <SlideOutPanel />
        <Header 
          onShowHistory={() => setShowHistory(true)} 
          onStartInterview={handleStartPractice}
        />
        
        <div className="container mx-auto px-4 py-8">
          {practiceMode === 'inactive' && (
            <WelcomeScreen onStartPractice={handleStartPractice} />
          )}

          {practiceMode === 'practicing' && (
            <PracticeSession
              onComplete={handleCompletePractice}
            />
          )}

          {practiceMode === 'completed' && (
            <PracticeResults
              results={sessionResults}
              onStartNewSession={handleStartNewSession}
            />
          )}

          {showHistory && (
            <FeedbackHistory onClose={() => setShowHistory(false)} />
          )}
        </div>
      </div>
    </div>
  );
}