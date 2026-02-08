import { useQuery } from '@tanstack/react-query';
import { CountriesApi } from '../api/countries.endpoints';

export function useCountriesQuery() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: CountriesApi.getAll,
  });
}
