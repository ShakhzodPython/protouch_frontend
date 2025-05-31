import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

import { Carousel } from './components/Common/Carousel/Carousel';
import { CarouselCategory } from './components/Common/CarouselCategory/CarouselCategory';
import { CarouselDiscount } from './components/Common/CarouselDiscount/CarouselDiscount';
import { PopularProduct } from './components/PopularProduct/PopularProduct';
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation()
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      if (location.state.loginSuccess) {
        toast.success(t('loginSuccess'));
        window.history.replaceState({}, document.title);
      } else if (location.state.orderSuccess) {
        toast.success(t('orderSuccess'));
        window.history.replaceState({}, document.title);
      } else if (location.state.loginGoogleSuccess) {
        toast.success(t('loginSuccess'));
        window.history.replaceState({}, document.title);
      } else if (location.state.logoutSuccess) {
        toast.error(t('logoutSuccess'))
        window.history.replaceState({}, document.title);
      }
    }
  }, [location, t]);

  return (
    <>
      <Carousel />
      <CarouselCategory />
      <CarouselDiscount />
      <PopularProduct />
    </>
  );
}
