import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router';

import styles from './Register.module.scss';
import googleIcon from '../../../assets/icons/google_icon.svg';
import checkIcon from '../../../assets/icons/check_icon.svg';
import {
  RegisterErrorStateType,
  RegisterStateType,
  SubmitDataErrorType,
  SubmitDataType,
} from './Register.types.ts';
import { useRegister } from '../../../hooks/useAuth.ts';
import {
  isDisabled as RegisterIsDisabled,
  validateRegister,
} from '../../../utils/validators.ts';
import { Input } from '../Inputs/Input.tsx';
import { useTranslation } from 'react-i18next';

export function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<RegisterStateType>({
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const disabledButton = RegisterIsDisabled({
    formData: registerData,
    isChecked,
    t
  });
  const [errors, setErrors] = useState<RegisterErrorStateType>({});

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    if (/\d/.test(input)) {
      if (!input.startsWith('+998 ')) {
        input = '+998 ' + input;
      }
    }

    if (input.trim() === '' || input === '+998 ') {
      setRegisterData({ ...registerData, emailOrPhone: '' });
      return;
    }

    if (/\d/.test(input) && /[a-zA-Zа-яА-Я]/.test(input)) {
      input = input.replace('+998 ', '');
    }

    setRegisterData({ ...registerData, emailOrPhone: input });
  };

  const { mutate, isPending } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateRegister({ formData: registerData, isChecked, t });
    setErrors(newErrors);

    // Cancel submission, if errors exist
    if (Object.keys(newErrors).length > 0) return;

    const submitData: SubmitDataType = {
      email_or_phone: registerData.emailOrPhone
        .replace('+', '')
        .replace(/\s/g, ''), // Removes plus and space
      password: registerData.password,
      confirm_password: registerData.confirmPassword,
    };

    mutate(submitData, {
      onSuccess: () => {
        navigate('/auth/login');
        window.location.reload();
      },

      onError: (e) => {
        const error = e as AxiosError<SubmitDataErrorType>;
        if (!error.response) {
          setErrors({
            confirmPassword: t('errors.default'),
          });
        }

        if (error.response?.data) {
          const mappedErrors: RegisterErrorStateType = {
            emailOrPhone: error.response.data.email_or_phone,
          };
          setErrors(mappedErrors);
        }
      },
    });
  };

  // TODO: handle authorized user, don't show this page
  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit} className={styles.register_form}>
        <h1 className={styles.register_form_title}>{t('register')}</h1>
        <div className={styles.register_form_inputs}>
          <Input
            type='text'
            value={registerData.emailOrPhone}
            error={errors.emailOrPhone}
            placeholder={t('placeholderEmailPhoneNumber')}
            onChange={handlePhoneNumberChange}
          />
          <Input
            type='password'
            value={registerData.password}
            error={errors.password}
            placeholder={t('placeholderPassword')}
            onChange={(e) => {
              setRegisterData({ ...registerData, password: e.target.value });
            }}
          />
          <Input
            type='password'
            value={registerData.confirmPassword}
            error={errors.confirmPassword}
            placeholder={t('placeholderConfirmPassword')}
            onChange={(e) => {
              setRegisterData({
                ...registerData,
                confirmPassword: e.target.value,
              });
            }}
          />
        </div>
        <div className={styles.register_form_credentials}>
          <div
            onClick={() => setIsChecked(!isChecked)}
            className={`${styles.register_form_credentials_checkbox}
            ${
              isChecked ? styles.register_form_credentials_checkbox_checked : ''
            }
            `}
          >
            {isChecked && <img src={checkIcon} alt='check' />}
          </div>
          <p className={styles.register_form_credentials_text}>
            {t('termService')}<br />
            <Link to='#'>{t('privacyPolicy')}</Link>
          </p>
        </div>

        <div className={styles.register_form_buttons}>
          <button
            style={{
              opacity: disabledButton ? '50%' : 1,
              cursor: disabledButton ? 'not-allowed' : 'pointer',
            }}
            disabled={disabledButton}
            className={styles.register_form_buttons_register}
          >
            <span>{isPending ? t('loginProcess') : t('register')}</span>
          </button>
          <span className={styles.register_form_buttons_span}>Или</span>
          <button className={styles.register_form_buttons_google}>
            <img src={googleIcon} alt='google-icon' />
            <span>{t('loginGoogle')}</span>
          </button>
          {errors.google && <p>{errors.google}</p>}
          <p className={styles.register_form_buttons_text}>
            {t('authText')}? <Link to='/auth/login'>{t('login')}</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
