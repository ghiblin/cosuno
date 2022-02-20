import { specialties } from '..';

export type Company = {
  name: string;
  logo: string;
  specialties: Specialty[];
  city: string;
};

export type Specialty = typeof specialties[number];
