import styles from './Item.module.scss';
import { CartItemType } from '../Cart.types';
import { Link } from 'react-router';

// TODO: Add swiper for cart items
export function Item({ cart }: { cart: Array<CartItemType> }) {
  return (
    <div className={styles.cart_model_window_form_content_cards}>
      {cart.map((item) => (
        <Link to={`/products/product/${item.product.id}`}>
          <div
            key={item.product.id}
            className={styles.cart_model_window_form_content_cards_card}
          >
            <div
              className={styles.cart_model_window_form_content_cards_card_image}
            >
              <img src={item.product.image} alt={item.product.title} />
              {item.quantity > 0 && (
                <div
                  className={
                    styles.cart_model_window_form_content_cards_card_quantity
                  }
                >
                  <span>{item.quantity}</span>
                </div>
              )}
            </div>
            <div
              className={
                styles.cart_model_window_form_content_cards_card_heading
              }
            >
              <h2
                className={
                  styles.cart_model_window_form_content_cards_card_heading_title
                }
              >
                {item.product.title}
              </h2>
              <p
                className={
                  styles.cart_model_window_form_content_cards_card_heading_short_description
                }
              >
                {item.product.short_description}
              </p>
              <h3
                className={
                  styles.cart_model_window_form_content_cards_card_heading_price
                }
              >
                {Number(
                  item.product.discount && item.product.discount.is_active
                    ? item.product.discount.discounted_price
                    : item.product.price
                )
                  .toLocaleString('ru-RU')
                  .replace(/,/g, ' ')}{' '}
                so'm
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
