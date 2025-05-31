type CategoryChildrenBrandType = {
  id: string;
  title: string;
};

type CategoryChildrenType = {
  id: string;
  title: string;
  slug: string;
  brands?: Array<CategoryChildrenBrandType>;
};

type CategoryImageType = {
  id: string;
  url: string;
};

export type CategoryType = {
  id: string;
  title: string;
  slug: string;
  is_carousel: boolean;
  image: CategoryImageType;
  children: Array<CategoryChildrenType>;
};

type DiscountType = {
  id: string;
  percent: number;
  discounted_price: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
};

export type ProductType = {
  id: string;
  title: string;
  short_description: string;
  slug: string;
  price: string;
  is_in_stock: boolean;
  is_pre_order: boolean;
  image: string;
  discount: DiscountType;
};

export type PaginationType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<ProductType>;
};

type ImageType = {
  id: string;
  url: string;
};

type Detail = {
  key: string;
  value: string;
};

export type ProductDetailType = {
  id: string;
  title: string;
  slug: string;
  price: string;
  short_description: string;
  description: string;
  is_in_stock: boolean;
  is_pre_order: boolean;
  discount: DiscountType;
  images: Array<ImageType>;
  details: Array<Detail>;
};
