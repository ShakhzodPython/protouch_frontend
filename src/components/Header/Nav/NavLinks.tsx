import { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router';

import styles from '../Header.module.scss';
import { LinksType, NavLinksProps } from './Nav.types';
import { useTranslation } from 'react-i18next';

export function NavLinks({ activeLink, setActiveLink }: NavLinksProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const links: Array<LinksType> = useMemo(
    () => [
      { name: t('products'), url: '/products' },
      { name: t('footer.careers'), url: '/careers' },
      { name: t('footer.aboutUs'), url: '/about-us' }
    ],
    [t]
  );

  useEffect(() => {
    const active = links.find((link) => link.url == location.pathname);
    if (active) {
      setActiveLink(active.name);
      localStorage.setItem('activeLink', active.name);
    } else if (location.pathname === '/') {
      setActiveLink(null);
      localStorage.removeItem('activeLink');
    }
  }, [links, location.pathname, setActiveLink]);

  return (
    <ul className={styles.header_nav_list}>
      {links.map((link, id) => (
        <li
          key={id}
          className={`${styles.header_nav_list_link} ${
            activeLink === link.name ? styles.header_nav_list_link_active : null
          }`}
        >
          <Link to={link.url}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
}
