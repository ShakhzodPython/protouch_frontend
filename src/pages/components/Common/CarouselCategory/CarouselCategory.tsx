import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router';

import styles from './CarouselCategory.module.scss';
import imageNotFound from '../../../../assets/static/image_notfund.webp';
import { useCategory as useCarouselCategory } from '../../../../hooks/useProduct';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function CarouselCategory() {
  const { t } = useTranslation();
  const { data: carouselCategories } = useCarouselCategory('true');

  return (
    <div className={styles.carousel_category_swiper}>
      <div className={styles.carousel_category_swiper_container}>
        <h1 className={styles.carousel_category_swiper_title}>
          {t('categories')}
        </h1>
        <Swiper
          allowTouchMove={true}
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={
            carouselCategories && carouselCategories.length > 4 ? 3.5 : 3
          }
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={carouselCategories && carouselCategories.length > 3}
          speed={3000}
          grabCursor={true}
          breakpoints={{
            414: {
              slidesPerView: 1,
            },
            430: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 1.5,
            },
            992: {
              slidesPerView: 2.5,
            },
            1200: {
              slidesPerView:
                carouselCategories && carouselCategories.length > 4 ? 2.5 : 2,
            },
            1440: {
              slidesPerView:
                carouselCategories && carouselCategories.length >= 4 ? 2.5 : 2,
            },
            1920: {
              slidesPerView:
                carouselCategories && carouselCategories.length > 4 ? 3.5 : 3,
            },
          }}
        >
          {carouselCategories?.map((carouselCategory) => (
            <SwiperSlide key={carouselCategory.id}>
              <div className={styles.carousel_category_swiper_slides}>
                <div className={styles.carousel_category_swiper_slides_slide}>
                    <h3
                      className={
                        styles.carousel_category_swiper_slides_slide_title
                      }
                    >
                      {carouselCategory.title}
                    </h3>
                  {carouselCategory.image ? (
                    <img
                      className={
                        styles.carousel_category_swiper_slides_slide_image
                      }
                      src={carouselCategory.image.url}
                      alt={carouselCategory.title}
                    />
                  ) : (
                    <img
                      className={
                        styles.carousel_category_swiper_slides_slide_image
                      }
                      src={imageNotFound}
                      alt='notfound_image'
                    />
                  )}
                  <div
                    className={
                      styles.carousel_category_swiper_slides_slide_bottom
                    }
                  >
                    <Link to={`/products/${carouselCategory.slug}`}>
                      <button
                        className={
                          styles.carousel_category_swiper_slides_slide_bottom_button
                        }
                      >
                        <span>{t('goOver')}</span>
                        <div
                          className={
                            styles.carousel_category_swiper_slides_slide_bottom_arrow_button
                          }
                        >
                          <ArrowRight
                            className={
                              styles.carousel_category_swiper_slides_slide_bottom_arrow_button_icon
                            }
                          />
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
