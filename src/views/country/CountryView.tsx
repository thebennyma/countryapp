import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCountriesQuery } from '../../hooks/useCountriesQuery';
import type { CountryListItem } from '../../api/countries.endpoints';

import SearchPx from '../../components/SearchPx';
import FieldSelectPx from '../../components/FieldSelectPx';

import styles from './CountryView.module.css';

type Region = 'All' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

const regionOptions = [
  { label: 'Africa', value: 'Africa' },
  { label: 'America', value: 'Americas' },
  { label: 'Asia', value: 'Asia' },
  { label: 'Europe', value: 'Europe' },
  { label: 'Oceania', value: 'Oceania' },
];

export default function CountryView() {
  const { data = [], isLoading, isError, error } = useCountriesQuery();

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>('All');

  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();

    return data.filter((c: CountryListItem) => {
      const matchRegion = region === 'All' ? true : c.region === region;
      const matchSearch = q ? c.name.common.toLowerCase().includes(q) : true;
      return matchRegion && matchSearch;
    });
  }, [data, search, region]);

  if (isLoading) return <p className={styles.main}>Loading countries...</p>;
  if (isError) return <p className={styles.main}>{(error as any)?.message ?? 'Error loading countries'}</p>;

  return (
    <main className={styles.main}>
      <section className={styles.toolbar}>
        <SearchPx value={search} onChange={setSearch} />
        <FieldSelectPx value={region} onChange={(v) => setRegion(v as Region)} placeholder="Filter by Region" options={regionOptions} />
      </section>

      <section className={styles.grid}>
        {filteredCountries.map((c) => (
          <Link key={c.cca3} to={`/country/${c.cca3}`} className={styles.card}>
            <img className={styles.flag} src={c.flags.png} alt={c.flags.alt ?? c.name.common} />
            <div className={styles.body}>
              <h3 className={styles.name}>{c.name.common}</h3>

              <p className={styles.row}>
                <span className={styles.label}>Population:</span> {c.population.toLocaleString()}
              </p>
              <p className={styles.row}>
                <span className={styles.label}>Region:</span> {c.region}
              </p>
              <p className={styles.row}>
                <span className={styles.label}>Capital:</span> {c.capital?.[0] ?? '—'}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {!filteredCountries.length && <p className={styles.empty}>No countries found with those filters.</p>}
    </main>
  );
}
