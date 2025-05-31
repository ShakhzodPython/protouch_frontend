import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

import styles from './Cart.module.scss';
import cartIcon from '../../assets/icons/red_cart_icon.svg';
import { CartModelWindowFormLinkType } from './Cart.types.ts';
import { useAuthContext } from '../../hooks/useAuth.ts';
import { useCartContext } from '../../hooks/useCart.ts';
import { Item } from './Item/Item.tsx';

export function Cart() {
  const { t } = useTranslation();
  const cartModelWindowFormLinks: Array<CartModelWindowFormLinkType> = [
    { name: t('breadcrumbs.data'), url: '/profile/data' },
    { name: t('breadcrumbs.orders'), url: '/profile/orders' },
  ];

  const { user } = useAuthContext();
  const { cart, clearCart } = useCartContext();

  return (
    <div className={styles.cart_model_window}>
      <div className={styles.cart_model_window_container}>
        <div className={styles.cart_model_window_form}>
          {cart.length === 0 ? (
            <h1 className={styles.cart_model_window_form_title}>
              {t('emptyBasket')}...
            </h1>
          ) : (
            <div className={styles.cart_model_window_form_content}>
              <h1 className={styles.cart_model_window_form_content_title}>
                {t('basket')}
              </h1>
              <Item cart={cart} />
            </div>
          )}
          {!user && cart.length === 0 ? (
            <p className={styles.cart_model_window_form_text}>
              <Link to='/auth/register'>{t('registerText')}</Link>
              {', '}
              {t('productsAddText')}.
            </p>
          ) : null}
          <ul className={styles.cart_model_window_form_list}>
            <h3 className={styles.cart_model_window_form_list_title}>
              {t('personalAccount')}
            </h3>
            {cartModelWindowFormLinks.map((cartModelWindowFormLink, id) => (
              <li key={id} className={styles.cart_model_window_form_list_link}>
                <Link
                  to={user ? cartModelWindowFormLink.url : '/auth/register'}
                >
                  {cartModelWindowFormLink.name}
                </Link>
              </li>
            ))}
          </ul>
          {cart.length === 0 ? (
            !user ? (
              <div className={styles.cart_model_window_form_buttons}>
                <Link to='/auth/register'>
                  <button
                    className={styles.cart_model_window_form_buttons_register}
                  >
                    <span>{t('register')}</span>
                  </button>
                </Link>
                <Link to='/auth/login'>
                  <button
                    className={styles.cart_model_window_form_buttons_login}
                  >
                    <span>{t('login')}</span>
                  </button>
                </Link>
              </div>
            ) : (
              <div className={styles.cart_model_window_form_buttons}>
                <Link to='/products'>
                  <button
                    className={
                      styles.cart_model_window_form_buttons_add_to_cart
                    }
                  >
                    <span>{t('addProducts')}</span>
                  </button>
                </Link>
              </div>
            )
          ) : (
            <div className={styles.cart_model_window_form_buttons}>
              <Link to='/order/create'>
                <button
                  className={styles.cart_model_window_form_buttons_add_to_cart}
                >
                  <span>{t('placeOrder')}</span>
                </button>
              </Link>

              <Link to='#'>
                <button
                  className={styles.cart_model_window_form_buttons_get_co}
                >
                  <span>{t('getCO')}</span>
                </button>
              </Link>
                <button
                  className={styles.cart_model_window_form_buttons_clear_cart}
                  onClick={clearCart}
                >
                  <span>{t('clearBasket')}</span>
                  <img src={cartIcon} alt='cart-icon' />
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
