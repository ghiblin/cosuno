import { Company, specialties, Specialty } from '@cosuno/api-interfaces';
import { Express, Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import companies from './data';

/**
 * Utilty function to filter company array by company name
 *
 * @param q the string to search
 * @returns filter function
 */
function byName(q: string) {
  return function (company: Company): boolean {
    return (
      // convert to lower case to prevent case mismatch
      company.name.toLowerCase().includes(q)
    );
  };
}

/**
 * Utility function to filter company array by specialties
 *
 * @param specialties list of specialties to check
 * @returns filter function
 */
function bySpecialties(specialties?: Specialty[]) {
  // if no specialties are passed, return an identity function
  if (!specialties) {
    return function () {
      return true;
    };
  }
  return function (company: Company): boolean {
    return specialties.every((specialty) =>
      company.specialties.includes(specialty)
    );
  };
}

export function addCompaniesRoutes(app: Express) {
  app.get(
    '/api/companies',
    [
      query('q', 'Should be a string').optional().isAlphanumeric(),
      query('s')
        .optional()
        .custom((value) =>
          String(value)
            .split(',')
            .every((specialty) =>
              // I need to convert to string[] in order to check if specialty is included
              (specialties as unknown as string[]).includes(specialty)
            )
        )
        .withMessage(`Should be one of ${specialties.join(', ')}`),
    ],
    (req: Request, res: Response) => {
      if (!validationResult(req).isEmpty()) {
        return res.status(422).json(validationResult(req));
      }
      const q = (req.query.q as string) || '';
      const s = req.query.s
        ? ((req.query.s as string).split(',') as Specialty[])
        : null;
      const filtered = companies
        .filter(byName(q.toLowerCase()))
        .filter(bySpecialties(s));
      res.json(filtered);
    }
  );
}
