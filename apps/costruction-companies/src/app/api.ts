import { Company, Specialty } from '@cosuno/api-interfaces';

export async function getCompanies({ q, s }: { q?: string; s?: Specialty[] }) {
  const params: string[] = [];
  if (q) {
    params.push('q=' + q);
  }
  if (Array.isArray(s) && s.length) {
    params.push('s=' + s.join(','));
  }
  const req = await fetch(
    `/api/companies${params.length ? '?' + params.join('&') : ''}`
  );
  const companies = await req.json();
  if (req.status !== 200) {
    throw new Error(companies);
  }
  return companies as Company[];
}
