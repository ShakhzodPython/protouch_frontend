import { ProductType } from '../../types/productService.types';

export type ProductPropsType = {
  products: Array<ProductType>;
  isSidebarOpen?: boolean
};
