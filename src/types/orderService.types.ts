type OrderAddressType = {
  country: string;
  address: string;
  floor: string;
  apartment: string;
  intercom_code?: string;
  phone_number: string;
};

export type OrderType = {
  customer_id: string;
  products: Array<{ product_id: string; quantity: number }>;
  order_address: OrderAddressType;
  order_payment: string;
  order_delivery: string;
};

export type GetOrderType = {
  id: string;
  order_number: string;
  products: Array<{
    product_id: string;
    title: string;
    price: number;
    image: string;
  }>;
  created_at: string
};
