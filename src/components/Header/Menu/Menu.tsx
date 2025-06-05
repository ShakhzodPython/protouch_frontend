import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronRight } from 'lucide-react';

import styles from '../Header.module.scss';
import { LinksType } from '../Nav/Nav.types';
import { MenuPropsType } from './Menu.types';
import { Link, useNavigate } from 'react-router';

const languages: Array<'ru' | 'uz' | 'en'> = ['ru', 'uz', 'en'];

export function Menu({ toggleBurgerMenu }: MenuPropsType) {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const links: Array<LinksType> = useMemo(
    () => [
      { name: t('products'), url: '/products' },
      { name: t('footer.careers'), url: '/careers' },
      { name: t('footer.aboutUs'), url: '/about-us' },
    ],
    [t]
  );

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
    <div className={styles.header_nav_burger_menu_layout_content}>
      <div className={styles.header_nav_burger_menu_layout_content_button}>
        <X onClick={toggleBurgerMenu} />
      </div>
      <ul className={styles.header_nav_burger_menu_layout_content_list}>
        {links.map((link, index) => (
          <li
            key={index}
            onClick={() => {
              navigate(link.url);
              window.location.reload();
            }}
            className={styles.header_nav_burger_menu_layout_content_list_link}
          >
            <span>{link.name}</span>
            <ChevronRight />
          </li>
        ))}
        <li
          onClick={changeLanguage}
          className={styles.header_nav_burger_menu_layout_content_list_link}
        >
          <span>{t('footer.language')}</span>
          <ChevronRight />
        </li>
      </ul>
      <div className={styles.header_nav_burger_menu_layout_content_heading}>
        <p
          className={styles.header_nav_burger_menu_layout_content_heading_text}
        >
          Вам надо пройти регистрацию чтоб заказать товар
        </p>
        <div
          className={
            styles.header_nav_burger_menu_layout_content_heading_button
          }
        >
          <Link to={'/auth/register'}>
            <button
              className={
                styles.header_nav_burger_menu_layout_content_heading_button_register
              }
            >
              <span>{t('register')}</span>
            </button>
          </Link>
          <Link to='/auth/login'>
            <button
              className={
                styles.header_nav_burger_menu_layout_content_heading_button_login
              }
            >
              <span>{t('login')}</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
