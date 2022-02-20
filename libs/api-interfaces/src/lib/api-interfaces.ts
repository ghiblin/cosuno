import { specialties } from '..';

export type Company = {
  id: number;
  name: string;
  logo: string;
  specialties: Specialty[];
  city: string;
};

export type Specialty = typeof specialties[number];
