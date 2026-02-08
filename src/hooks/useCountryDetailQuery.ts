import { useQuery } from '@tanstack/react-query';
import { CountriesApi } from '../api/countries.endpoints';

export function useCountryDetailQuery(code: string | undefined) {
  return useQuery({
    queryKey: ['country', code],
    queryFn: () => CountriesApi.getByCode(code!),
    enabled: Boolean(code),
  });
}
