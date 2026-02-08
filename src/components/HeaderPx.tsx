import { useTheme } from '../hooks/useTheme';
import styles from './HeaderPx.module.css';

import darkIcon from '../assets/dark.png';
import lightIcon from '../assets/light.png';

export default function HeaderPx() {
  const { theme, toggle } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Where in the world?</h1>

        <button type="button" className={styles.toggle} onClick={toggle} aria-label="Toggle theme">
          <img src={theme === 'dark' ? lightIcon : darkIcon} alt="" aria-hidden="true" className={styles.icon} />

          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </header>
  );
}
