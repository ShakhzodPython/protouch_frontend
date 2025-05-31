import { useMutation, useQuery } from '@tanstack/react-query';

import {
  RegisterType,
  LoginResponseData,
  LoginType,
  UserUpdateType,
  UserPartialUpdateType,
} from '../types/authService.types';
import {
  getMe,
  login,
  register,
  updateMeFull,
  updateMePartial,
} from '../service/authService';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useRegister() {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: RegisterType) => register(data),
    onSuccess: () => {},
  });
}

export function useLogin() {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginType) => login(data),
    onSuccess: (data: LoginResponseData) => {
      sessionStorage.setItem('access_token', data.access_token);
      sessionStorage.setItem('refresh_token', data.refresh_token);
    },
  });
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    enabled: true,
  });
}

export function useUpdateMeFull() {
  return useMutation({
    mutationFn: (data: UserUpdateType) => updateMeFull(data),
  });
}

export function useUpdateMePartial() {
  return useMutation({
    mutationFn: (data: UserPartialUpdateType) => updateMePartial(data),
  });
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}
