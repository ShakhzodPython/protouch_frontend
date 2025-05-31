import axios from 'axios';

import { GetOrderType, OrderType } from '../types/orderService.types';
import { BASE_URL } from '../utils';

export const createOrder = async (data: OrderType) => {
  const token = sessionStorage.getItem('access_token');

  if (!token) {
    throw new Error('Authentication token is missing');
  }

  try {
    const response = await axios.post<OrderType>(
      `${BASE_URL}/api/v1/orders/create/`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Something went wrong, please try again late: ${error}`);
  }
};

export const getOrder = async (): Promise<Array<GetOrderType>> => {
  const token = sessionStorage.getItem('access_token');

  if (!token) {
    throw new Error('Authentication token is missing');
  }

  const response = await axios.get<Array<GetOrderType>>(
    `${BASE_URL}/api/v1/orders/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};
