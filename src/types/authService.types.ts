import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query';

export type RegisterType = {
  email_or_phone: string;
  password: string;
  confirm_password: string;
};

export type LoginType = {
  email_or_phone: string;
  password: string;
};

export type LoginResponseData = {
  access_token: string;
  refresh_token: string;
};

export type UserType = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
};

export type UserUpdateType = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export type UserPartialUpdateType = Partial<UserUpdateType>;

export type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isPending: boolean;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<UserType, Error>>;
};

export type AuthProviderPropsType = {
  children: React.ReactNode;
};

export type TokenType = {
  access_token: string;
  refresh_token?: string;
};

export type GoogleTokenType = {
  access_token: string;
  expires_in?: number;
  token_type?: string;
  scope?: string;
};
