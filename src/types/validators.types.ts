export type RegisterErrorType = {
  emailOrPhone?: string;
  password?: string;
  confirmPassword?: string;
  checkbox?: string;
};

export type LoginErrorType = {
  emailOrPhone?: string;
  password?: string;
};

type ValidationErrorType = {
  emailOrPhone: string;
  password: string;
  confirmPassword?: string;
};

export type ValidationErrorPropsType = {
  formData: ValidationErrorType;
  isChecked?: boolean;
  t: (key: string) => string;
};

export type ValidationOrderPropsType = {
  address: string;
  phone_number: string;
  floor: string;
  apartment: string;
  t: (key: string) => string;
};

export type ValidationOrderType = {
  address: string;
  phone_number: string;
  floor: string;
  apartment: string;
};
