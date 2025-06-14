import React from 'react';
import { Play, Building2, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CompanyList } from './company/CompanyList';
import { Company } from '../types/company';

type WelcomeScreenProps = {
  onStartPractice: (company: Company) => void;
};

export function WelcomeScreen({ onStartPractice }: WelcomeScreenProps) {
  const { user } = useAuth();
  const [showCompanyList, setShowCompanyList] = React.useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.email}!
          </h1>
          <p className="text-lg text-gray-600">
            Ready to practice your technical interview skills?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <Building2 className="h-8 w-8 text-indigo-600 mb-2 btn-icon" />
            <h3 className="font-semibold text-gray-900 mb-1">Company-Specific</h3>
            <p className="text-sm text-gray-600">Questions tailored to each company</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <Star className="h-8 w-8 text-indigo-600 mb-2 btn-icon" />
            <h3 className="font-semibold text-gray-900 mb-1">Technical Focus</h3>
            <p className="text-sm text-gray-600">Real coding and system design questions</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <Play className="h-8 w-8 text-indigo-600 mb-2 btn-icon" />
            <h3 className="font-semibold text-gray-900 mb-1">Instant Feedback</h3>
            <p className="text-sm text-gray-600">AI-powered evaluation</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowCompanyList(true)}
            className="btn-primary inline-flex items-center px-6 py-3 border border-transparent 
                     text-base font-medium rounded-md text-white bg-indigo-600 
                     hover:bg-indigo-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Play className="h-5 w-5 mr-2" />
            Select Company & Start Practice
          </button>
        </div>
      </div>

      {showCompanyList && (
        <CompanyList
          onClose={() => setShowCompanyList(false)}
          onStartInterview={onStartPractice}
        />
      )}
    </div>
  );
}