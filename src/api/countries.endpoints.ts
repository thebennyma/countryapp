import { http } from './http';

export type CountryListItem = {
  name: { common: string; nativeName?: Record<string, { common: string }> };
  flags: { png: string; svg: string; alt?: string };
  population: number;
  region: string;
  capital?: string[];
  cca3: string;
};

export type CountryDetail = CountryListItem & {
  subregion?: string;
  tld?: string[];
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
  borders?: string[];
};

const FIELDS_LIST = 'name,flags,population,region,capital,cca3';
const FIELDS_DETAIL =
  'name,flags,population,region,subregion,capital,tld,currencies,languages,borders,cca3';

export const CountriesApi = {
  getAll() {
    return http
      .get<CountryListItem[]>('/all', { params: { fields: FIELDS_LIST } })
      .then((r) => r.data);
  },

  getByCode(code: string) {
    return http
      .get(`/alpha/${encodeURIComponent(code)}`, {
        params: {
          fields: FIELDS_DETAIL,
        },
      })
      .then((r) => {
        const data = r.data;

        // /alpha/{code} puede devolver objeto o array
        const country = Array.isArray(data) ? data[0] : data;

        return country ?? null; // ✅ NUNCA undefined
      });
  },

  getByCodes(codes: string[]) {
    return http
      .get<Array<{ name: { common: string }; cca3: string }>>('/alpha', {
        params: { codes: codes.join(','), fields: 'name,cca3' },
      })
      .then((r) => r.data);
  },
};
