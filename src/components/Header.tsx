import React from 'react';
import { Briefcase, History } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserMenu } from './user/UserMenu';
import { CompanySelector } from './company/CompanySelector';
import { Company } from '../types/company';

type HeaderProps = {
  onShowHistory: () => void;
  onStartInterview?: (company: Company) => void;
};

export function Header({ onShowHistory, onStartInterview }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-white" />
            <span className="ml-2 text-white text-xl font-bold">InterviewAI</span>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <CompanySelector onStartInterview={onStartInterview} />
              <button
                onClick={onShowHistory}
                className="flex items-center text-white hover:text-indigo-100"
              >
                <History className="h-5 w-5 mr-1" />
                History
              </button>
              <div className="flex items-center text-white">
                <span className="mr-4">{user.email}</span>
                <UserMenu />
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}