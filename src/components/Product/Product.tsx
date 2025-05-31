import { Heart, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

import styles from './Product.module.scss';
import imageNotFound from '../../assets/static/image_notfund.webp';
import cartIcon from '../../assets/icons/cart_icon.svg';
import { ProductPropsType } from './Product.types';
import { useCartContext } from '../../hooks/useCart';
import { useFavoriteContext } from '../../hooks/useFavorite';

export function Product({ products, isSidebarOpen }: ProductPropsType) {
  const { t } = useTranslation();
  const { cart, addToCart, updateQuantity, removeFromCart } = useCartContext();
  const {
    products: favorites,
    addToFavorites,
    removeFromFavorites,
  } = useFavoriteContext();

  const isFavorite = (productId: string) => {
    return favorites.some((favorite) => favorite.id === productId);
  };

  return (
    <div className={styles.products}>
      <div
        className={`${styles.products_cards} 
        ${
          isSidebarOpen
            ? styles.products_cards_sidebar_open
            : styles.products_cards_sidebar_closed
        }`}
      >
        {products.map((product) => (
          <div key={product.id} className={styles.products_cards_card}>
            <div className={styles.products_cards_card_image}>
              <Link to={`/products/product/${product.id}`}>
                <img
                  src={
                    product.image && product.image.trim() !== ''
                      ? product.image
                      : imageNotFound
                  }
                  alt={product.title}
                />
              </Link>
              <Heart
                onClick={() =>
                  isFavorite(product.id)
                    ? removeFromFavorites(product.id)
                    : addToFavorites(product)
                }
                className={`${styles.products_cards_card_image_heart_icon} 
                ${
                  isFavorite(product.id)
                    ? styles.products_cards_card_image_heart_icon_active
                    : null
                }`}
              />
            </div>
            <div className={styles.products_cards_card_details}>
              <div className={styles.products_cards_card_details_heading}>
                <h3
                  className={styles.products_cards_card_details_heading_title}
                >
                  {product.title}
                </h3>
                <p
                  className={
                    styles.products_cards_card_details_heading_short_description
                  }
                >
                  {product.short_description}
                </p>
              </div>
              <div className={styles.products_cards_card_details_status}>
                {product.discount && product.discount.is_active ? (
                  <button
                    className={
                      styles.products_cards_card_details_status_discount
                    }
                  >
                    <span>%{product.discount.percent}</span>
                  </button>
                ) : null}
                {product.is_in_stock ? (
                  <button
                    className={
                      styles.products_cards_card_details_status_in_stock
                    }
                  >
                    <span>{t('inStock')}</span>
                  </button>
                ) : product.is_pre_order ? (
                  <button
                    className={
                      styles.products_cards_card_details_status_pre_order
                    }
                  >
                    <span>{t('preOrder')}</span>
                  </button>
                ) : null}
              </div>
              <div className={styles.products_cards_card_details_price}>
                {product.discount && product.discount.is_active ? (
                  <p>
                    {Number(product.discount.discounted_price)
                      .toLocaleString('ru-RU')
                      .replace(/,/g, ' ')}{' '}
                    so'm
                    <span>{product.price}</span>
                  </p>
                ) : (
                  <p>
                    {Number(product.price)
                      .toLocaleString('ru-RU')
                      .replace(/,/g, ' ')}{' '}
                    so'm
                  </p>
                )}
              </div>
              <div className={styles.products_cards_card_details_bottom}>
                <div
                  className={styles.products_cards_card_details_bottom_buttons}
                >
                  <Link to={`/products/product/${product.id}`}>
                    <button
                      className={
                        styles.products_cards_card_details_bottom_buttons_button_more
                      }
                    >
                      <span>{t('more')}</span>
                    </button>
                  </Link>
                  {(() => {
                    const cartItem = cart.find(
                      (item) => item.product.id === product.id
                    );

                    if (!cartItem) {
                      return (
                        <button
                          onClick={() => addToCart(product)}
                          className={
                            styles.products_cards_card_details_bottom_buttons_button_add_to_cart
                          }
                        >
                          <span>{t('intoBasket')}</span>
                          <img src={cartIcon} alt='cart-icon' />
                        </button>
                      );
                    }

                    return (
                      <div
                        className={
                          styles.products_cards_card_details_bottom_counter
                        }
                      >
                        <button
                          onClick={() =>
                            cartItem.quantity > 1
                              ? updateQuantity(
                                  product.id,
                                  cartItem.quantity - 1
                                )
                              : removeFromCart(product.id)
                          }
                          className={
                            styles.products_cards_card_details_bottom_counter_minus
                          }
                        >
                          <Minus />
                        </button>
                        <span>{cartItem.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, cartItem.quantity + 1)
                          }
                          className={
                            styles.products_cards_card_details_bottom_counter_plus
                          }
                        >
                          <Plus />
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
