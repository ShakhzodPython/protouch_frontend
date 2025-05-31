import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import styles from './ProductDetail.module.scss';
import shoppingBag from '../../assets/icons/cart_icon.svg';
import { useProductDetail } from '../../hooks/useProduct';
import { ChevronLeft, ChevronRight, ChevronUp, Heart } from 'lucide-react';
import { useCartContext } from '../../hooks/useCart';
import { useFavoriteContext } from '../../hooks/useFavorite';

export function ProductDetail() {
  const [isDeliveryVisible, setIsDeliveryVisible] = useState<boolean>(true);
  const [isSupportVisible, setIsSupportVisible] = useState<boolean>(true);
  const [isQualityVisible, setIsQualityVisible] = useState<boolean>(true);
  const [isDescriptionsVisible, setIsDescriptionsVisible] =
    useState<boolean>(true);
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(true);

  const { product_id } = useParams<{ product_id: string }>();
  const { data: product } = useProductDetail(product_id || null);

  const { cart, addToCart, updateQuantity, removeFromCart } = useCartContext();
  const cartItem = cart.find((item) => item.product.id === product?.id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const selectedImage = product?.images[currentImageIndex];

  useEffect(() => {
    if (product?.images.length) {
      setCurrentImageIndex(0);
    }
  }, [product]);

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (product?.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === (product?.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const {
    products: favorites,
    addToFavorites,
    removeFromFavorites,
  } = useFavoriteContext();
  const isFavorite = (productId: string) => {
    return favorites.some((favorite) => favorite.id === productId);
  };

  if (product?.id !== product_id) {
    return 'Product not found';
  }

  return (
    <div className={styles.product_detail}>
      <div className={styles.product_detail_container}>
        <div className={styles.product_detail_layout}>
          {/* Thumbnails */}
          <div className={styles.product_detail_layout_thumbnails}>
            <div className={styles.product_detail_layout_thumbnails_images}>
              {product?.images.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`${
                    styles.product_detail_layout_thumbnails_image
                  } ${
                    selectedImage?.url === image.url
                      ? styles.product_detail_layout_thumbnails_image_active
                      : null
                  }`}
                >
                  <img src={image.url} alt='image' />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div className={styles.product_detail_layout_thumbnails_main_image}>
              <img src={selectedImage?.url} alt='image' />

              <div
                className={
                  styles.product_detail_layout_thumbnails_main_image_buttons
                }
              >
                <button onClick={handlePrev}>
                  <ChevronLeft />
                </button>
                <button onClick={handleNext}>
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className={styles.product_detail_information}>
            <h1 className={styles.product_detail_information_title}>
              {product?.title}
            </h1>

            {/* Price */}
            <div className={styles.product_detail_information_price}>
              <span>Цена</span>
              <h3 className={styles.product_detail_information_price_text}>
                {(product?.discount?.is_active
                  ? Number(product.discount.discounted_price)
                  : Number(product?.price)
                )
                  ?.toLocaleString('ru-RU')
                  .replace(/,/g, ' ')}{' '}
                so'm
              </h3>
            </div>

            {/* Quantity */}
            {cartItem && (
              <div className={styles.product_detail_information_quantity}>
                <h3
                  className={styles.product_detail_information_quantity_title}
                >
                  Кол-во
                </h3>
                <div
                  className={styles.product_detail_information_quantity_counter}
                >
                  <button
                    onClick={() => {
                      if (cartItem.quantity > 1) {
                        updateQuantity(
                          product?.id ?? '',
                          cartItem.quantity - 1
                        );
                      } else {
                        removeFromCart(cartItem.product.id);
                      }
                    }}
                  >
                    <ChevronLeft />
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button
                    onClick={() => {
                      updateQuantity(
                        cartItem.product.id,
                        cartItem.quantity + 1
                      );
                    }}
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            )}

            {/* Delivery Information */}
            <div className={styles.product_detail_information_delivery}>
              <div className={styles.product_detail_information_delivery_hide}>
                <h3
                  className={
                    styles.product_detail_information_delivery_hide_title
                  }
                >
                  Доставка
                </h3>
                <ChevronUp
                  style={{
                    cursor: 'pointer',
                    color: '#222',
                    transform: isDeliveryVisible
                      ? 'rotate(0deg)'
                      : 'rotate(180deg)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onClick={() => setIsDeliveryVisible((prev) => !prev)}
                />
              </div>
              {isDeliveryVisible && (
                <>
                  <p>Бесплатная доставка по всему Ташкенту.</p>
                  <p>В течении 3-й дней</p>
                </>
              )}
            </div>

            <hr className={styles.product_detail_information_bottom_line}></hr>

            {/* Buttons */}
            <div className={styles.product_detail_information_buttons}>
              <button
                onClick={() => {
                  if (!product) return;
                  const favoriteProduct = {
                    id: product.id,
                    title: product.title,
                    short_description: product.short_description,
                    slug: product.slug,
                    price: product.price,
                    is_in_stock: product.is_in_stock,
                    is_pre_order: product.is_pre_order,
                    image: product.images[0]?.url || '',
                    discount: product.discount,
                  };

                  if (isFavorite(product.id)) {
                    removeFromFavorites(product.id);
                  } else {
                    addToFavorites(favoriteProduct);
                  }
                }}
                className={styles.product_detail_information_buttons_favorite}
              >
                <span>Избранное</span>
                <Heart
                  className={
                    product?.id && isFavorite(product.id)
                      ? styles.product_detail_information_buttons_favorite_icon_active
                      : styles.product_detail_information_buttons_favorite_icon
                  }
                />
              </button>
              {product && !cartItem ? (
                <button
                  onClick={() =>
                    addToCart({
                      ...product,
                      image: product.images[0]?.url || '',
                    })
                  }
                  className={styles.product_detail_information_buttons_cart}
                >
                  <span>В корзину</span>
                  <img src={shoppingBag} alt='shoppingBag' />
                </button>
              ) : null}
            </div>

            {/* Support */}
            <div className={styles.product_detail_information_support}>
              <div className={styles.product_detail_information_support_hide}>
                <h3
                  className={
                    styles.product_detail_information_support_hide_title
                  }
                >
                  Дистанционная поддержка
                </h3>
                <ChevronUp
                  style={{
                    cursor: 'pointer',
                    color: '#222',
                    transform: isSupportVisible
                      ? 'rotate(0deg)'
                      : 'rotate(180deg)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onClick={() => setIsSupportVisible((prev) => !prev)}
                />
              </div>
              {isSupportVisible && (
                <p>Наши специалисты помогут вам решить проблему.</p>
              )}
            </div>

            {/* Quality */}
            <div className={styles.product_detail_information_quality}>
              <div className={styles.product_detail_information_quality_hide}>
                <h3
                  className={
                    styles.product_detail_information_quality_hide_title
                  }
                >
                  Гарантия
                </h3>
                <ChevronUp
                  style={{
                    cursor: 'pointer',
                    color: '#222',
                    transform: isQualityVisible
                      ? 'rotate(0deg)'
                      : 'rotate(180deg)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onClick={() => setIsQualityVisible((prev) => !prev)}
                />
              </div>
              {isQualityVisible && <p>Гарантийное обслуживание на все 100%.</p>}
            </div>

            <hr className={styles.product_detail_information_bottom_line}></hr>

            {/* Descriptions */}
            <div className={styles.product_detail_information_description}>
              <div
                className={styles.product_detail_information_description_hide}
              >
                <h3
                  className={
                    styles.product_detail_information_description_hide_title
                  }
                >
                  Описание
                </h3>
                <ChevronUp
                  style={{
                    cursor: 'pointer',
                    color: '#222',
                    transform: isDescriptionsVisible
                      ? 'rotate(0deg)'
                      : 'rotate(180deg)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onClick={() => setIsDescriptionsVisible((prev) => !prev)}
                />
              </div>
              {isDescriptionsVisible && <p>{product?.description}</p>}
            </div>

            {/* Details */}
            <div className={styles.product_detail_information_details}>
              <div className={styles.product_detail_information_details_hide}>
                <h3
                  className={
                    styles.product_detail_information_details_hide_title
                  }
                >
                  Детали
                </h3>
                <ChevronUp
                  style={{
                    cursor: 'pointer',
                    color: '#222',
                    transform: isDetailVisible
                      ? 'rotate(0deg)'
                      : 'rotate(180deg)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onClick={() => setIsDetailVisible((prev) => !prev)}
                />
              </div>
              <div
                className={
                  styles.product_detail_information_details_hide_layout
                }
              >
                {isDetailVisible &&
                  product?.details.map((detail, index) => (
                    <div
                      key={index}
                      className={
                        styles.product_detail_information_details_hide_layout_item
                      }
                    >
                      <h3
                        className={
                          styles.product_detail_information_details_hide_layout_item_title
                        }
                      >
                        {detail.key}
                      </h3>
                      <span
                        className={
                          styles.product_detail_information_details_hide_layout_item_text
                        }
                      >
                        {detail.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
