import { useLocation, useNavigate } from 'react-router';

import styles from './Profile.module.scss';
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs';
import { Breadcrumbs } from '../../../components/Breadcrumbs/Breadcrumbs';
import { Data } from './Data/Data';
import { OrderPage } from './OrderPage/OrderPage';

export function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const renderContent = () => {
    if (location.pathname === '/profile/data') {
      return <Data />;
    } else if (location.pathname === '/profile/orders') {
      return <OrderPage />;
    } else {
      return <p>Page not found</p>;
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    navigate('/', {
      state: { logoutSuccess: true },
    });
    window.location.reload();
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile_container}>
        <Breadcrumbs items={breadcrumbs} />
        <div className={styles.profile_layout}>
          <aside className={styles.profile_layout_aside}>
            <h1 className={styles.profile_layout_aside_title}>
              Личный кабинет
            </h1>
            <ul className={styles.profile_layout_aside_list}>
              <li
                onClick={() => handleNavigation('/profile/data')}
                className={`${styles.profile_layout_aside_list_link} 
                ${
                  location.pathname === '/profile/data'
                    ? styles.profile_layout_aside_list_link_active
                    : null
                } `}
              >
                <span>Данные</span>
              </li>
              <div className={styles.profile_layout_aside_list_bottom_line} />
              <li
                onClick={() => handleNavigation('/profile/orders')}
                className={`${styles.profile_layout_aside_list_link} 
                ${
                  location.pathname === '/profile/orders'
                    ? styles.profile_layout_aside_list_link_active
                    : null
                } `}
              >
                <span>Заказы</span>
              </li>
              <div className={styles.profile_layout_aside_list_bottom_line} />
              <li
                onClick={handleLogout}
                className={styles.profile_layout_aside_list_link_logout}
              >
                <span
                  className={styles.profile_layout_aside_list_link_logout_text}
                >
                  Выйти
                </span>
              </li>
            </ul>
          </aside>
          <div className={styles.profile_layout_content}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
