import axios from 'axios';

import { BASE_URL } from '../utils';
import {
  CategoryType,
  PaginationType,
  ProductDetailType,
} from '../types/productService.types';

export const getCategories = async (
  is_carousel?: string,
  lang?: string
): Promise<Array<CategoryType>> => {
  const params: Record<string, string> = {};

  if (is_carousel !== undefined) {
    params.is_carousel = is_carousel;
  }

  const response = await axios.get<Array<CategoryType>>(
    `${BASE_URL}/api/v1/products/categories/`,
    {
      params: {
        is_carousel,
        lang,
      },
    }
  );
  return response.data;
};

export const getProducts = async (
  page: number,
  slug?: string,
  brand?: string,
  lang?: string,
  title?: string
): Promise<PaginationType> => {
  const response = await axios.get<PaginationType>(
    `${BASE_URL}/api/v1/products/`,
    {
      params: {
        page,
        slug,
        brand,
        title,
        lang
      },
    }
  );

  return response.data;
};

export const getProductDetail = async (
  product_id: string,
  lang?: string
): Promise<ProductDetailType> => {
  const response = await axios.get<ProductDetailType>(
    `${BASE_URL}/api/v1/products/product/${product_id}/`, 
    {
      params: {
        lang
      }
    }
  );
  return response.data;
};
