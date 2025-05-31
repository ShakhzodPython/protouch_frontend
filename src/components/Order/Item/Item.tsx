import styles from './Item.module.scss';
import { CartItemProps } from '../../Cart/Cart.types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Item({
  cart,
  orderType,
  setOrderType,
  updateQuantity,
  removeFromCart,
}: CartItemProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.order_layout}>
      <h1 className={styles.order_layout_title}>{t('order.main')}</h1>
      <div className={styles.order_layout_content}>
        {cart.map((item) => (
          <div
            key={item.product.id}
            className={styles.order_layout_content_item}
          >
            <div className={styles.order_layout_content_item_image}>
              <img src={item.product.image} alt={item.product.title} />
            </div>
            <div className={styles.order_layout_content_item_heading}>
              {/* Title */}
              <h1 className={styles.order_layout_content_item_heading_title}>
                {item.product.title}
              </h1>

              {/* Price */}
              <div className={styles.order_layout_content_item_heading_price}>
                <p
                  className={
                    styles.order_layout_content_item_heading_price_text
                  }
                >
                  {t('order.price')}
                </p>
                <h3
                  className={
                    styles.order_layout_content_item_heading_price_number
                  }
                >
                  {(item.product?.discount?.is_active
                    ? Number(item.product.discount.discounted_price)
                    : Number(item.product?.price)
                  )
                    ?.toLocaleString('ru-RU')
                    .replace(/,/g, ' ')}{' '}
                  so'm
                </h3>
              </div>

              {/* Quantity */}
              <div
                className={styles.order_layout_content_item_heading_quantity}
              >
                <h3
                  className={
                    styles.order_layout_content_item_heading_quantity_text
                  }
                >
                  {t('order.quantity')}
                </h3>
                <div
                  className={
                    styles.order_layout_content_item_heading_quantity_counter
                  }
                >
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(
                          item.product?.id ?? '',
                          item.quantity - 1
                        );
                      } else {
                        removeFromCart(item.product.id);
                      }
                    }}
                  >
                    <ChevronLeft />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      updateQuantity(item.product.id, item.quantity + 1);
                    }}
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.order_layout_content_item_order_type}>
          <button
            onClick={() => setOrderType('DELIVERY')}
            className={`${styles.order_layout_content_item_order_type_delivery}
            ${
              orderType === 'DELIVERY'
                ? styles.order_layout_content_item_order_type_delivery_active
                : null
            }`}
          >
            <span
              className={`${
                styles.order_layout_content_item_order_type_delivery_text
              }
            ${
              orderType === 'DELIVERY'
                ? styles.order_layout_content_item_order_type_delivery_text_active
                : null
            }`}
            >
               {t('order.typeOrder')}
            </span>
          </button>
          <p>{t('order.typeOrderInfo')}</p>
          <button
            onClick={() => setOrderType('PICKUP')}
            className={`${styles.order_layout_content_item_order_type_pickup}
            ${
              orderType === 'PICKUP'
                ? styles.order_layout_content_item_order_type_pickup_active
                : null
            }`}
          >
            <span
              className={`${
                styles.order_layout_content_item_order_type_pickup_text
              }
            ${
              orderType === 'PICKUP'
                ? styles.order_layout_content_item_order_type_pickup_text_active
                : null
            }`}
            >
               {t('order.typePickup')}
            </span>
          </button>
          <p>{t('order.typePickupInfo')}</p>
        </div>
      </div>
    </div>
  );
}
