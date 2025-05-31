import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ChevronRight, Globe } from 'lucide-react';

import styles from './Footer.module.scss';
import linkedin from '../../assets/icons/linkedin.svg';
import instagram from '../../assets/icons/instagram.svg';
import telegram from '../../assets/icons/telegram.svg';
import facebook from '../../assets/icons/facebook.svg';
import { Column } from './Column/Column';
import { FooterColumns } from '../../utils/footer';

const languages: Array<'ru' | 'uz' | 'en'> = ['ru', 'uz', 'en'];

export function Footer() {
  const { i18n, t } = useTranslation();

  const columns = FooterColumns();

  const [currentLanguage, setCurrentLanguage] = useState(
    languages.indexOf(i18n.language as 'ru' | 'uz' | 'en') || 0
  );

  const changeLanguage = () => {
    const nextIndex = (currentLanguage + 1) % languages.length;
    const nextLanguage = languages[nextIndex];
    i18n.changeLanguage(nextLanguage);
    window.location.reload();
    localStorage.setItem('lang', nextLanguage);
    setCurrentLanguage(nextIndex);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('lang') as 'ru' | 'uz' | 'en';
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      setCurrentLanguage(languages.indexOf(savedLanguage));
    }
  }, [i18n]);

  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_top_line} />
        <div className={styles.footer_columns}>
          {columns.map((column, index) => (
            <Column key={index} title={column.title} columns={column.columns} />
          ))}

          <div className={styles.footer_columns_icon_layout}>
            <div className={styles.footer_columns_icon_layout_item}>
              <h1 className={styles.footer_columns_icon_layout_item_title}>
                {t('footer.followUs')}
              </h1>
              <ul className={styles.footer_columns_icon_layout_item_list}>
                <li
                  className={styles.footer_columns_icon_layout_item_list_link}
                >
                  <Link to='#'>
                    <img src={linkedin} alt='linkedin' />
                  </Link>
                </li>
                <li
                  className={styles.footer_columns_icon_layout_item_list_link}
                >
                  <Link to='#'>
                    <img src={instagram} alt='instagram' />
                  </Link>
                </li>
                <li
                  className={styles.footer_columns_icon_layout_item_list_link}
                >
                  <Link to='#'>
                    <img src={telegram} alt='telegram' />
                  </Link>
                </li>
                <li
                  className={styles.footer_columns_icon_layout_item_list_link}
                >
                  <Link to='#'>
                    <img src={facebook} alt='facebook' />
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.footer_columns_icon_layout_item}>
              <h1 className={styles.footer_columns_icon_layout_item_title}>
                {t('footer.help')}
              </h1>
            </div>

            <div className={styles.footer_columns_icon_layout_item}>
              <div className={styles.footer_columns_icon_layout_item_language}>
                <Globe />
                <h1
                  className={
                    styles.footer_columns_icon_layout_item_language_title
                  }
                >
                 {t('footer.language')}
                </h1>
              </div>
              <div
                className={
                  styles.footer_columns_icon_layout_item_language_button
                }
              >
                <button>
                  <span>{t('language')}</span>
                </button>
                <ChevronRight onClick={changeLanguage} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer_bottom_line} />
      </div>
    </div>
  );
}
