import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { CompanyList } from './CompanyList';
import { useCompanies } from '../../hooks/useCompanies';
import { Company } from '../../types/company';

type CompanySelectorProps = {
  onStartInterview?: (company: Company) => void;
};

export function CompanySelector({ onStartInterview }: CompanySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCompany, selectCompany } = useCompanies();

  const handleCompanySelect = (company: Company) => {
    selectCompany(company);
    if (onStartInterview) {
      onStartInterview(company);
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-white hover:text-indigo-100"
      >
        <Building2 className="h-5 w-5 mr-1" />
        {selectedCompany ? selectedCompany.name : 'Select Company'}
      </button>

      {isOpen && (
        <CompanyList
          onClose={() => setIsOpen(false)}
          onStartInterview={handleCompanySelect}
        />
      )}
    </>
  );
}