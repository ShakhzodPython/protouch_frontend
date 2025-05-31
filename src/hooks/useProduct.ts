import { useQueries, useQuery } from '@tanstack/react-query';
import {
  getCategories,
  getProductDetail,
  getProducts,
} from '../service/productService';
import { useLanguage } from './useLanguage';

export function useCategory(is_carousel?: string) {
  const lang = useLanguage();

  return useQuery({
    queryKey: ['categories', is_carousel],
    queryFn: () => getCategories(is_carousel, lang),
  });
}

export function useProduct(page: number, slug?: string, brand?: string) {
  const lang = useLanguage();

  return useQuery({
    queryKey: ['products', page, slug, brand],
    queryFn: () => getProducts(page, slug, brand, lang),
  });
}

export function useChildProduct(
  params: Array<{ page: number; slug: string; brand?: string }>
) {
  const lang = useLanguage();
  return useQueries({
    queries: params.map(({ page, slug, brand }) => ({
      queryKey: ['products', page, slug, brand],
      queryFn: () => getProducts(page, slug, brand, lang),
    })),
  });
}

export function useProductDetail(product_id: string | null) {
  const lang = useLanguage();
  return useQuery({
    queryKey: ['productDetail'],
    queryFn: () => (product_id ? getProductDetail(product_id, lang) : null),
    enabled: !!product_id,
  });
}
