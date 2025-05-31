import { ProductType } from '../../../types/productService.types';

export type FavoriteContextType = {
  products: Array<ProductType>;
  addToFavorites: (product: ProductType) => void;
  removeFromFavorites: (productId: string) => void;
};

export type FavoriteProviderPropsType = {
  children: React.ReactNode;
};
