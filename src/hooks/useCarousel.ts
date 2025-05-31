import { useQuery } from '@tanstack/react-query';

import { useLanguage } from './useLanguage';
import { getCarousels, getCarouselDiscounts } from '../service/carouselService';

export function useCarousel() {
  const lang = useLanguage();
  
  return useQuery({
    queryKey: ['carousels'],
    queryFn: () => getCarousels(lang),
  });
}

export function useCarouselDiscount() {
  return useQuery({
    queryKey: ['carouselDiscounts'],
    queryFn: getCarouselDiscounts,
  });
}
