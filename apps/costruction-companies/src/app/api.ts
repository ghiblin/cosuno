import { Company, Specialty } from '@cosuno/api-interfaces';
import { getGlobalObject } from '../misc';

export default class API {
  static async getCompanies({ q, s }: { q?: string; s?: Specialty[] }) {
    const global = getGlobalObject<Window>();

    const params: string[] = [];
    if (q) {
      params.push('q=' + q);
    }
    if (Array.isArray(s) && s.length) {
      params.push('s=' + s.join(','));
    }
    const res = await global.fetch(
      `/api/companies${params.length ? '?' + params.join('&') : ''}`
    );
    if (res.status >= 200 && res.status < 300) {
      const companies = await res.json();
      return companies as Company[];
    }
    throw new Error(`Failed to load companies`);
  }
}
