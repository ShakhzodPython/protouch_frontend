import {
  RegisterErrorType,
  LoginErrorType,
  ValidationOrderType,
  ValidationErrorPropsType,
  ValidationOrderPropsType
} from '../types/validators.types';

export const validateRegister = ({
  formData,
  isChecked,
  t,
}: ValidationErrorPropsType): RegisterErrorType => {
  const errors: RegisterErrorType = {};

  const onlyNumber = formData.emailOrPhone.replace(/\D/g, '');
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  const passwordLengthRegex = /.{8,}/;
  const passwordUppercaseRegex = /[A-Z]/;
  const passwordLowercaseRegex = /[a-z]/;
  const passwordDigitRegex = /\d/;

  if (!formData.emailOrPhone) {
    errors.emailOrPhone = t('errors.emailOrPhoneNumber');
  } else if (formData.emailOrPhone.startsWith('+998')) {
    if (onlyNumber.length !== 12) {
      errors.emailOrPhone = t('errors.phoneNumberLength');
    }
  } else if (!emailRegex.test(formData.emailOrPhone)) {
    errors.emailOrPhone = t('errors.email');
  }

  if (!formData.password) {
    errors.password = t('errors.password');
  } else {
    if (!passwordLengthRegex.test(formData.password)) {
      errors.confirmPassword = t('errors.passwordLength');
    }
    if (!passwordUppercaseRegex.test(formData.password)) {
      errors.confirmPassword = t('errors.passwordUppercase');
    }
    if (!passwordLowercaseRegex.test(formData.password)) {
      errors.confirmPassword = t('errors.passwordLowercase');
    }
    if (!passwordDigitRegex.test(formData.password)) {
      errors.confirmPassword = t('errors.passwordNumber');
    }
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = t('errors.confirmPassword');
  }
  if (formData.confirmPassword !== formData.confirmPassword) {
    errors.confirmPassword = t('errors.passwordNotMatch');
  }

  if (!isChecked) errors.checkbox = t('termConditions');
  return errors;
};

export const validateLogin = ({ formData, t }: ValidationErrorPropsType) => {
  const errors: LoginErrorType = {};

  if (!formData.emailOrPhone) errors.emailOrPhone = t('emailOrPhoneNumber');
  if (!formData.password) errors.password = t('password');
  return errors;
};

export const isDisabled = ({
  formData,
  isChecked,
}: ValidationErrorPropsType): boolean => {
  return (
    !formData.emailOrPhone ||
    !formData.password ||
    (formData.confirmPassword !== undefined && !formData.confirmPassword) ||
    (isChecked !== undefined && !isChecked)
  );
};

export const validateOrder = ({
  address,
  phone_number,
  floor,
  apartment,
  t,
}: ValidationOrderPropsType): {
  isValid: boolean;
  errors: ValidationOrderType;
} => {
  const errors = {
    address: address.trim() === '' ? t('errors.emptyField') : '',
    floor: floor.trim() === '' ? t('errors.emptyField') : '',
    apartment: apartment.trim() === '' ? t('errors.emptyField') : '',
    phone_number: phone_number.trim() === '' ? t('errors.emptyField') : '',
  };
  const isValid = !Object.values(errors).some((error) => error !== '');
  return { isValid, errors: errors };
};
