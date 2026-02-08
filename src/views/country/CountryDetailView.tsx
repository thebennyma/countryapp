import { Link, useParams } from 'react-router-dom';
import { useBorderCountriesQuery } from '../../hooks/useBorderCountriesQuery';
import { useCountryDetailQuery } from '../../hooks/useCountryDetailQuery';
import styles from './CountryDetailView.module.css';
import BackPx from '../../components/BackPx';

export default function CountryDetailView() {
  const { code } = useParams();
  const { data: country, isLoading, isError } = useCountryDetailQuery(code);
  const { data: borders } = useBorderCountriesQuery(country?.borders);

  if (isLoading) return <p className={styles.page}>Loading...</p>;
  if (isError || !country) return <p className={styles.page}>Country not found</p>;

  const nativeName = country.name.nativeName ? (Object.values(country.name.nativeName)[0] as any)?.common : country.name.common;

  const currencies = country.currencies ? Object.values(country.currencies).map((c) => (c as any).name) : [];
  const languages = country.languages ? Object.values(country.languages) : [];

  return (
    <main className={styles.page}>
      <BackPx />

      <section className={styles.content}>
        <img className={styles.flag} src={country.flags.svg || country.flags.png} alt={country.flags.alt ?? country.name.common} />

        <div>
          <h1 className={styles.title}>{country.name.common}</h1>

          <div className={styles.infoGrid}>
            <div>
              <p className={styles.row}>
                <span className={styles.label}>Native Name:</span> {nativeName}
              </p>
              <p className={styles.row}>
                <span className={styles.label}>Population:</span> {country.population.toLocaleString()}
              </p>
              <p className={styles.row}>
                <span className={styles.label}>Region:</span> {country.region}
              </p>
              <p className={styles.row}>
                <span className={styles.label}>Sub Region:</span> {country.subregion ?? '—'}
              </p>
              <p className={styles.row}>
                <span className={styles.label}>Capital:</span> {country.capital?.[0] ?? '—'}
              </p>
            </div>

            <div>
              <p className={styles.row}>
                <span className={styles.label}>Top Level Domain:</span> {country.tld?.[0] ?? '—'}
              </p>
              <p className={styles.row}>
                <span className={styles.label}>Currencies:</span> {currencies.join(', ') || '—'}
              </p>
              <p className={styles.row}>
                <span className={styles.label}>Languages:</span> {languages.join(', ') || '—'}
              </p>
            </div>
          </div>

          <div className={styles.bordersRow}>
            <span className={styles.borderLabel}>Border Countries:</span>

            <div className={styles.borderList}>
              {borders?.length ? (
                borders.map((b) => (
                  <Link key={b.cca3} to={`/country/${b.cca3}`} className={styles.borderLink}>
                    {b.name.common}
                  </Link>
                ))
              ) : (
                <span>—</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
