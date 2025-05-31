import { ProductType } from '../../types/productService.types';

export type CartModelWindowFormLinkType = {
  name: string;
  url: string;
};

export type CartItemType = {
  product: ProductType;
  quantity: number;
};

export type CartItemProps = {
  cart: Array<CartItemType>;
  orderType: 'DELIVERY' | 'PICKUP';
  setOrderType: React.Dispatch<React.SetStateAction<'DELIVERY' | 'PICKUP'>>;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

export type CartContextType = {
  cart: Array<CartItemType>;
  addToCart: (product: ProductType) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export type CartProviderPropsType = {
  children: React.ReactNode;
};
