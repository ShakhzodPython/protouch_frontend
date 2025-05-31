import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router';

import styles from './CarouselDiscount.module.scss';
import imageNotFound from '../../../../assets/static/image_notfund.webp';
import { useCarouselDiscount } from '../../../../hooks/useCarousel';
import { useTranslation } from 'react-i18next';

export function CarouselDiscount() {
  const { t } = useTranslation()
  const { data: carouselDiscounts } = useCarouselDiscount();

  return (
    <div className={styles.carousel_discount_swiper}>
      <div className={styles.carousel_discount_swiper_container}>
        <h1>{t('discounts')}</h1>
        <Swiper
          allowTouchMove={true}
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={carouselDiscounts && carouselDiscounts.length > 1}
          speed={3000}
          grabCursor={true}
        >
          {carouselDiscounts?.map((carouselDiscount) => (
            <SwiperSlide key={carouselDiscount.id}>
              <div className={styles.carousel_discount_swiper_slide}>
                <Link to={carouselDiscount.url}>
                  {carouselDiscount.image ? (
                    <img src={carouselDiscount.image.url} alt='image' />
                  ) : (
                    <img src={imageNotFound} alt='image' />
                  )}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
