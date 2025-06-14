import React, { useState } from 'react';
import { Search, X, Play } from 'lucide-react';
import { Company } from '../../types/company';
import { useCompanies } from '../../hooks/useCompanies';

type CompanyListProps = {
  onClose: () => void;
  onStartInterview: (company: Company) => void;
};

export function CompanyList({ onClose, onStartInterview }: CompanyListProps) {
  const { companies } = useCompanies();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartInterview = (company: Company) => {
    onStartInterview(company);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Select Company for Interview Practice</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-10 h-10 object-contain"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-500">{company.industry}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleStartInterview(company)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Interview
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}