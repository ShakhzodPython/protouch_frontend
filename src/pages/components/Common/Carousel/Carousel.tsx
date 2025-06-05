import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

import styles from './Carousel.module.scss';
import backgroundImage from '../../../../assets/icons/background_logo.svg';
import ImageNotFound from '../../../../assets/static/image_notfund.webp';
import { useCarousel } from '../../../../hooks/useCarousel';
import { useTranslation } from 'react-i18next';

export function Carousel() {
  const { t } = useTranslation();
  const { data: carousels } = useCarousel();

  return (
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
      loop={carousels && carousels.length > 1}
      speed={3000}
      grabCursor={true}
    >
      {carousels?.map((carousel) => (
        <SwiperSlide key={carousel.id}>
          <div className={styles.carousel_swiper}>
            <div className={styles.carousel_swiper_container}>
              <div className={styles.carousel_swiper_slide_image}>
                {carousel.image ? (
                  <img src={carousel.image.url} alt='carousel-slide-image' />
                ) : (
                  <img src={ImageNotFound} alt='carousel-slide-image' />
                )}
              </div>

              <div
                style={{
                  background: `${carousel.carousel_color.background_color}`,
                  backgroundImage: `url(${backgroundImage})`,
                }}
                className={styles.carousel_swiper_slide_layout}
              >
                <div className={styles.carousel_swiper_slide_layout_info}>
                  <h3
                    className={styles.carousel_swiper_slide_layout_info_title}
                  >
                    {carousel.text}
                  </h3>
                  <div className={styles.carousel_swiper_slide_layout_info_buttons}>
                  
                      <button
                        className={
                          styles.carousel_swiper_slide_layout_info_button
                        }
                      >
                        <span
                          style={{
                            color: `${carousel.carousel_color.percentage_color}`,
                          }}
                        >
                          {carousel.sub_text}
                        </span>
                      </button>
                  </div>
                </div>

                <div className={styles.carousel_swiper_slide_layout_sell}>
                  <Link to={carousel.url}>
                    <button
                      style={{
                        background: `${carousel.carousel_color.button_background_color}`,
                      }}
                      className={
                        styles.carousel_swiper_slide_layout_sell_arrow_button
                      }
                    >
                      <ArrowRight />
                    </button>
                  </Link>
                  <Link to={carousel.url}>
                    <button
                      style={{
                        background: `${carousel.carousel_color.button_background_color}`,
                      }}
                      className={
                        styles.carousel_swiper_slide_layout_sell_button
                      }
                    >
                      <span>{t('buy')}</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
