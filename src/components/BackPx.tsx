import { useNavigate } from 'react-router-dom';
import styles from './BackPx.module.css';

export default function BackPx() {
  const navigate = useNavigate();

  return (
    <button type="button" className={styles.button} onClick={() => navigate(-1)}>
      <span className={styles.icon} aria-hidden="true">
        ←
      </span>
      Back
    </button>
  );
}
