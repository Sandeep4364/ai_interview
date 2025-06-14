import { useState } from 'react';
import { Company } from '../types/company';
import { companies } from '../data/companies';

export function useCompanies() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const selectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  return {
    companies,
    selectedCompany,
    selectCompany,
  };
}