import { useQuery } from '@tanstack/react-query';
import { CountriesApi } from '../api/countries.endpoints';

export function useBorderCountriesQuery(borders: string[] | undefined) {
  return useQuery({
    queryKey: ['borders', borders?.join(',') ?? 'none'],
    queryFn: () => CountriesApi.getByCodes(borders ?? []),
    enabled: Boolean(borders?.length),
  });
}
