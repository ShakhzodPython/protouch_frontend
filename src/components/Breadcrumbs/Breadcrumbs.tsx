import { Link, useLocation } from 'react-router';

import styles from './Breadcrumbs.module.scss';
import slashIcon from '../../assets/icons/slash_icon.svg';
import { BreadcrumbsPropsType } from './Breadcrumbs.types';

export function Breadcrumbs({ items }: BreadcrumbsPropsType) {
  const location = useLocation();

  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, id) => {
        const isActive = item.url === location.pathname;
        return (
          <span key={id}>
            {item.url ? (
              <Link
                to={item.url}
                className={
                  isActive
                    ? styles.breadcrumbs_link_active
                    : styles.breadcrumbs_link
                }
              >
                {item.name}{' '}
              </Link>
            ) : (
              <span className={styles.breadcrumbs_link_active}>
                {item.name}
              </span>
            )}
            {id < items.length - 1 && <img src={slashIcon} alt='slash-icon' />}
          </span>
        );
      })}
    </nav>
  );
}
