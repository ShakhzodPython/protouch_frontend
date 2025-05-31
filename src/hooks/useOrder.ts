import { useMutation, useQuery } from '@tanstack/react-query';

import { createOrder, getOrder } from '../service/orderService';
import { OrderType } from '../types/orderService.types';

export function useOrder() {
  return useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (order: OrderType) => createOrder(order),
  });
}

export function useGetOrder() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrder,
  });
}
