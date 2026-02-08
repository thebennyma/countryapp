import styles from './SearchPx.module.css';

type SearchPxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchPx({ value, onChange, placeholder = 'Search for a country...', className }: SearchPxProps) {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <input className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label="Search" />
    </div>
  );
}
