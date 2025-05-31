import axios, { isAxiosError } from 'axios';

import { BASE_URL } from '../utils';
import {
  RegisterType,
  LoginType,
  LoginResponseData,
  UserType,
  TokenType,
  GoogleTokenType,
  UserUpdateType,
  UserPartialUpdateType,
} from '../types/authService.types';

export const register = async (data: RegisterType) => {
  const response = await axios.post<RegisterType>(
    `${BASE_URL}/api/v1/auth/register/`,
    data
  );

  return response.data;
};

export const login = async (data: LoginType): Promise<LoginResponseData> => {
  const response = await axios.post<LoginResponseData>(
    `${BASE_URL}/api/v1/auth/login/`,
    data
  );
  return response.data;
};

export const authGoogle = async (token: GoogleTokenType) => {
  const { access_token } = token;

  const response = await axios.post(`${BASE_URL}/api/v1/auth/social/google/`, {
    token: access_token,
  });

  return response.data;
};

export const getMe = async (): Promise<UserType> => {
  const token = sessionStorage.getItem('access_token');

  if (!token) {
    throw new Error('Authentication token is missing');
  }

  try {
    const response = await axios.get<UserType>(`${BASE_URL}/api/v1/auth/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid or expired token');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied');
      } else {
        throw new Error('Authentication failed');
      }
    } else {
      throw new Error('Something went wrong, please try again later');
    }
  }
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = sessionStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('Authentication token is missing');
  }

  try {
    const response = await axios.post<TokenType>(
      `${BASE_URL}/api/v1/auth/refresh/`,
      {
        refresh: refreshToken,
      }
    );

    const { access_token } = response.data;
    if (!access_token) {
      throw new Error('No access token returned');
    }

    sessionStorage.setItem('access_token', access_token);

    return access_token;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid or expired token');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied');
      } else {
        throw new Error('Authentication failed');
      }
    } else {
      throw new Error('Something went wrong, please try again later');
    }
  }
};

export const updateMeFull = async (data: UserUpdateType) => {
  const token = sessionStorage.getItem('access_token');

  if (!token) {
    throw new Error('Authentication token is missing');
  }

  try {
    const response = await axios.put(`${BASE_URL}/api/v1/auth/update/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid or expired token');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied');
      } else {
        throw new Error('Authentication failed');
      }
    } else {
      throw new Error('Something went wrong, please try again later');
    }
  }
};

export const updateMePartial = async (data: UserPartialUpdateType) => {
  const token = sessionStorage.getItem('access_token');

  if (!token) {
    throw new Error('Authentication token is missing');
  }

  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/auth/update/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid or expired token');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied');
      } else {
        throw new Error('Authentication failed');
      }
    } else {
      throw new Error('Something went wrong, please try again later');
    }
  }
};
