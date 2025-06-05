import { useEffect, useState } from 'react';
import styles from './NotFound.module.scss';
import { useTranslation } from 'react-i18next';

const letters = [
  'k',
  'v',
  'n',
  'z',
  'i',
  'x',
  'm',
  'e',
  't',
  'a',
  'x',
  'l',
  '4',
  '0',
  '4',
  'y',
  'y',
  'w',
  'v',
  'b',
  'o',
  'q',
  'd',
  'y',
  'p',
  'a',
  'p',
  'a',
  'g',
  'e',
  'v',
  'j',
  'a',
  'n',
  'o',
  't',
  's',
  'c',
  'e',
  'w',
  'v',
  'x',
  'e',
  'p',
  'c',
  'f',
  'h',
  'q',
  'e',
  'f',
  'o',
  'u',
  'n',
  'd',
  's',
  'w',
  'q',
  'v',
  'o',
  's',
  'm',
  'v',
  'f',
  'u',
];

const originalHighlightIndexes = new Set([
  12, 13, 14, 26, 27, 28, 29, 33, 34, 35, 49, 50, 51, 52, 53,
]);

export function NotFound() {
  const { t } = useTranslation();
  const [activeIndexes, setActiveIndexes] = useState<Set<number>>(new Set());

  useEffect(() => {
    const highlightArray = Array.from(originalHighlightIndexes);
    let i = 0;

    const interval = setInterval(() => {
      if (i < highlightArray.length) {
        const indexToAdd = highlightArray[i];

        setActiveIndexes((prev) => {
          const next = new Set(prev);
          next.add(indexToAdd);
          return new Set(next);
        });

        i++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.not_found}>
      <div className={styles.container}>
        <div className={styles.not_found_layout}>
          <div className={styles.wordSearch}>
            {letters.map((letter, index) => (
              <div
                key={index}
                className={`${styles.letter} ${
                  activeIndexes.has(index) ? styles.selected : ''
                }`}
              >
                {letter}
              </div>
            ))}
          </div>

          <div className={styles.content}>
            <h1 className={styles.heading}>
              {t('notFoundText')}.
            </h1>
            <p>
              {t('notFoundTextPart')}.
            </p>

            <div className={styles.nav}>
              <a className={styles.navLink} href='/'>
                {t('main')}
              </a>
              <a className={styles.navLink} href='/about-us'>
                {t('footer.careers')}
              </a>
              <a className={styles.navLink} href='/contact'>
              {t('footer.aboutUs')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
