import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

import styles from './Login.module.scss';
import googleIcon from '../../../assets/icons/google_icon.svg';
import {
  LoginErrorStateType,
  LoginStateType,
  SubmitDataErrorType,
  SubmitDataType,
} from './Login.types';
import {
  isDisabled as loginIsDisabled,
  validateLogin,
} from '../../../utils/validators';
import { useLogin } from '../../../hooks/useAuth';
import { Input } from '../Inputs/Input';
import { startTokenRefresh } from '../../../utils/tokenManger';
import { authGoogle } from '../../../service/authService';
import { useTranslation } from 'react-i18next';

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginStateType>({
    emailOrPhone: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginErrorStateType>({});
  const disabledButton = loginIsDisabled({ formData: loginData, t });

  const { mutate, isPending } = useLogin();

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (token) => {
      try {
        const response = await authGoogle(token);

        sessionStorage.setItem('access_token', response['access_token']);
        sessionStorage.setItem('refresh_token', response['refresh_token']);

        navigate('/', {
          state: { loginGoogleSuccess: true },
        });
        window.location.reload();
      } catch {
        setErrors({
          google: 'Что-то пошло не так, пожалуйста, повторите попытку позже',
        });
      }
    },
    onError: (error) => {
      console.error(`Something went wrong: ${error}`);
    },
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    if (/\d/.test(input)) {
      if (!input.startsWith('+998 ')) {
        input = '+998 ' + input;
      }
    }

    if (input.trim() === '' || input === '+998 ') {
      setLoginData({ ...loginData, emailOrPhone: '' });
      return;
    }

    if (/\d/.test(input) && /[a-zA-Zа-яА-Я]/.test(input)) {
      input = input.replace('+998 ', '');
    }

    setLoginData({ ...loginData, emailOrPhone: input });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateLogin({ formData: loginData, t });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const submitData: SubmitDataType = {
      email_or_phone: loginData.emailOrPhone
        .replace('+', '')
        .replace(/\s/g, ''), // Remove + and spaces
      password: loginData.password,
    };

    mutate(submitData, {
      onSuccess: () => {
        navigate('/', {
          state: { loginSuccess: true },
        });
        window.location.reload();
        startTokenRefresh();
      },
      onError: (e) => {
        const error = e as AxiosError<SubmitDataErrorType>;
        if (!error.response) {
          setErrors({
            password: 'Что-то пошло не так, пожалуйста попробуйте позже',
          });
        }
        if (error.response?.data) {
          const mappedErrors: LoginErrorStateType = {
            password: error.response.data.detail,
          };
          setErrors(mappedErrors);
        }
      },
    });
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <h1 className={styles.login_form_title}>{t('login')}</h1>
        <div className={styles.login_form_inputs}>
          <Input
            type='text'
            value={loginData.emailOrPhone}
            error={errors.emailOrPhone}
            placeholder={t('placeholderEmailPhoneNumber')}
            onChange={handlePhoneNumberChange}
          />

          <Input
            type='password'
            value={loginData.password}
            error={errors.password}
            placeholder={t('placeholderPassword')}
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
          />
        </div>
        <div className={styles.login_form_credentials}>
          <p className={styles.login_form_credentials_text}>
            {t('loginText')}?{' '}
            <Link to='/auth/register'>{t('registerText')}</Link>
          </p>
        </div>
        <div className={styles.login_form_buttons}>
          <button
            style={{
              opacity: disabledButton ? '50%' : 1,
              cursor: disabledButton ? 'not-allowed' : 'pointer',
            }}
            className={styles.login_form_buttons_login}
          >
            <span>{isPending ? t('loginProcess') : t('loginToAccount')}</span>
          </button>
          <span>{t('or')}</span>
          <button
            type='button'
            onClick={() => handleGoogleAuth()}
            className={styles.login_form_buttons_google}
          >
            <img src={googleIcon} alt='google-icon' />
            <span>{t('loginGoogle')}</span>
          </button>
          {errors.google && (
            <p className={styles.login_form_buttons_google_error}>
              {errors.google}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
