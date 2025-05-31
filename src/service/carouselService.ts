import axios from 'axios';
import {
  CarouselType,
  CarouselDiscountType,
} from '../types/carouselService.types';
import { BASE_URL } from '../utils';

export const getCarousels = async (
  lang?: string
): Promise<Array<CarouselType>> => {
  const response = await axios.get<Array<CarouselType>>(
    `${BASE_URL}/api/v1/common/carousels/`,
    {
      params: { lang },
    }
  );

  return response.data;
};

export const getCarouselDiscounts = async (): Promise<
  Array<CarouselDiscountType>
> => {
  const response = await axios.get<Array<CarouselDiscountType>>(
    `${BASE_URL}/api/v1/common/carousels/discount`
  );
  return response.data;
};
