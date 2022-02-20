import { Heading, Stack } from '@chakra-ui/react';
import { Company, specialties, Specialty } from '@cosuno/api-interfaces';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import API from './api';
import CompanyCard from './components/company-card';
import SearchField from './components/search-field';
import Specielties from './components/checkbox-group';

export const App = () => {
  const [query, setQuery] = useState('');
  const [checked, setChecked] = useState<Specialty[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };

  const onSpecialtyChange = (checked: Specialty[]) => {
    setChecked(checked);
  };

  useEffect(() => {
    API.getCompanies({ q: query, s: checked }).then(setCompanies);
  }, [query, checked]);

  return (
    <Stack
      width={'auto'}
      maxW={'500px'}
      mx={'auto'}
      my={8}
      boxShadow={'2xl'}
      p={4}
      gap={4}
    >
      <Heading>Find a company</Heading>
      <SearchField
        value={query}
        onChange={onSearchChange}
        data-testid="search-bar"
      />
      <Specielties
        options={specialties}
        onChange={onSpecialtyChange}
        data-testid="specialties-filter"
      />
      {companies.length &&
        companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            data-testid="company-card"
          />
        ))}
    </Stack>
  );
};

export default App;
