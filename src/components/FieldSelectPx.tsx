import styles from './FieldSelectPx.module.css';

type Option = {
  label: string;
  value: string;
};

type FieldSelectPxProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

export default function FieldSelectPx({ value, onChange, options, placeholder = 'Select an option', className }: FieldSelectPxProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={placeholder} className={`${styles.select} ${className ?? ''}`}>
      <option value="All" disabled>
        {placeholder}
      </option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
