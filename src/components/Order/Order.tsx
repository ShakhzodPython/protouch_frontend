import { useState } from 'react';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from './Order.module.scss';
import payme from '../../assets/icons/payme.svg';
import uzum from '../../assets/icons/uzum.svg';
import click from '../../assets/icons/click.svg';
import { useAuthContext } from '../../hooks/useAuth';
import { useCartContext } from '../../hooks/useCart';
import { Item } from './Item/Item';
import { Input } from './Input/Input';
import { validateOrder } from '../../utils/validators';
import { OrderType } from '../../types/orderService.types';
import { useOrder } from '../../hooks/useOrder';

export function Order() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();

  const order = useOrder();
  const { user } = useAuthContext();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartContext();

  //TODO: Localization default value
  const [address_form, setAddressForm] = useState({
    country: 'Ташкент',
    address: '',
    floor: '',
    apartment: '',
    intercom_code: '',
    phone_number: '',
  });

  const [errors, setErrors] = useState({
    address: '',
    floor: '',
    apartment: '',
    phone_number: '',
  });

  const [orderType, setOrderType] = useState<'DELIVERY' | 'PICKUP'>('DELIVERY');
  const [paymentType, setPaymentType] = useState('CARD');
  const [cardProvider, setCardProvider] = useState('PAYME');

  const totalPrice = cart.reduce((acc, item) => {
    const price = item.product.discount?.is_active
      ? Number(item.product.discount.discounted_price)
      : Number(item.product.price);

    return acc + price * item.quantity;
  }, 0);

  const handleSelectPaymentType = (type: string) => {
    setPaymentType(type);
    if (type === 'CASH') {
      setCardProvider('');
    }
  };
  const handleSubmitOrder = () => {
    if (!user || cart.length === 0) return;

    const { isValid, errors } = validateOrder({
      address: address_form.address,
      apartment: address_form.apartment,
      floor: address_form.floor,
      phone_number: address_form.phone_number,
      t,
    });
    setErrors(errors);

    const cleanedAddressForm = {
      country: address_form.country,
      address: address_form.address,
      floor: address_form.floor,
      apartment: address_form.apartment,
      phone_number: address_form.phone_number,
      ...(address_form.intercom_code && {
        intercom_code: address_form.intercom_code,
      }),
    };

    const payload: OrderType = {
      customer_id: user.id,
      products: cart.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
      order_address: cleanedAddressForm,
      order_payment: paymentType === 'CARD' ? cardProvider : 'CASH',
      order_delivery: orderType,
    };

    if (isValid) {
      order.mutate(payload, {
        onSuccess: () => {
          clearCart();
          navigate('/', {
            state: { orderSuccess: true },
          });
          window.location.reload();
        },
      });
    }
  };

  return (
    <div className={styles.order}>
      <div className={styles.order_container}>
        <Breadcrumbs items={breadcrumbs} />
        {user ? (
          // If user don't have items in cart
          cart.length === 0 ? (
            <div className={styles.order_empty_cart}>
              <div className={styles.order_empty_cart_heading}>
                <h1 className={styles.order_empty_cart_heading_title}>
                  {t('empty')}...
                </h1>
                <p className={styles.order_empty_cart_heading_text}>
                  {t('order.add')}{' '}
                  <Link to='/products'>{t('order.products')}</Link>{' '}
                  {t('order.offer')}
                </p>

                <Link to='/products'>
                  <button className={styles.order_empty_cart_heading_button}>
                    <span>{t('addProducts')}</span>
                    <ArrowRight color='#fff' />
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <Item
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                orderType={orderType}
                setOrderType={setOrderType}
              />

              {/* Delivery Address */}
              <div className={styles.order_delivery_content}>
                <h1 className={styles.order_delivery_content_title}>
                  {t('order.address')}
                </h1>

                <div className={styles.order_delivery_content_layout}>
                  {/* Select regions */}
                  <div
                    className={
                      styles.order_delivery_content_layout_select_regions
                    }
                  >
                    {/* Label */}
                    <label
                      htmlFor='region-select'
                      className={
                        styles.order_delivery_content_layout_select_regions_label
                      }
                    >
                      {t('order.region')}
                    </label>

                    {/* Select */}
                    <div
                      className={
                        styles.order_delivery_content_layout_select_regions_item
                      }
                    >
                      <select
                        onChange={(e) => {
                          setAddressForm({
                            ...address_form,
                            country: e.target.value,
                          });
                        }}
                        className={
                          styles.order_delivery_content_layout_select_regions_select
                        }
                      >
                        {/* Options */}
                        <option
                          value='Ташкент'
                          className={
                            styles.order_delivery_content_layout_select_regions_option
                          }
                        >
                          Ташкент
                        </option>

                        <option
                          value='Самарканд'
                          className={
                            styles.order_delivery_content_layout_select_regions_option
                          }
                        >
                          Самарканд
                        </option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>

                  {/* Input */}
                  <div className={styles.order_delivery_content_layout_inputs}>
                    <div
                      className={
                        styles.order_delivery_content_layout_inputs_list
                      }
                    >
                      {/* Address */}
                      <Input
                        label={t('order.addressText')}
                        name='address'
                        value={address_form.address}
                        error={errors.address}
                        onChange={(e) =>
                          setAddressForm({
                            ...address_form,
                            address: e.target.value,
                          })
                        }
                      />

                      {/* Intercom Code */}
                      <Input
                        label={t('order.intercom')}
                        name='intercom_code'
                        value={address_form.intercom_code}
                        onChange={(e) =>
                          setAddressForm({
                            ...address_form,
                            intercom_code: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Input */}
                  <div className={styles.order_delivery_content_layout_inputs}>
                    <div
                      className={
                        styles.order_delivery_content_layout_inputs_list
                      }
                    >
                      {/* Phone Number */}
                      <Input
                        label={t('order.phoneNumber')}
                        name='phone_number'
                        value={address_form.phone_number}
                        error={errors.phone_number}
                        onChange={(e) =>
                          setAddressForm({
                            ...address_form,
                            phone_number: e.target.value,
                          })
                        }
                      />

                      {/* Floor*/}
                      <Input
                        label={t('order.floor')}
                        name='floor'
                        value={address_form.floor}
                        error={errors.floor}
                        onChange={(e) =>
                          setAddressForm({
                            ...address_form,
                            floor: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Apartment*/}
                    <Input
                      label={t('order.apartment')}
                      name='apartment'
                      value={address_form.apartment}
                      error={errors.apartment}
                      onChange={(e) =>
                        setAddressForm({
                          ...address_form,
                          apartment: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className={styles.order_payment_type}>
                <h1 className={styles.order_payment_type_title}>
                  {t('order.paymentType')}
                </h1>
                <div className={styles.order_payment_type_layout}>
                  <div className={styles.order_payment_type_layout_content}>
                    <div className={styles.order_payment_type_layout_card}>
                      <button
                        className={`${
                          styles.order_payment_type_layout_card_button
                        }
                      ${
                        paymentType === 'CARD'
                          ? styles.order_payment_type_layout_card_button_active
                          : null
                      }
                      `}
                        onClick={() => handleSelectPaymentType('CARD')}
                      >
                        <span
                          className={`${
                            styles.order_payment_type_layout_card_button_text
                          }
                      ${
                        paymentType === 'CARD'
                          ? styles.order_payment_type_layout_card_button_text_active
                          : null
                      }
                      `}
                        >
                          {t('order.cardPaymentType')}
                        </span>
                      </button>
                      <button
                        className={`${
                          styles.order_payment_type_layout_card_button
                        } 
                      ${
                        paymentType === 'CASH'
                          ? styles.order_payment_type_layout_card_button_active
                          : null
                      }`}
                        onClick={() => handleSelectPaymentType('CASH')}
                      >
                        <span
                          className={`${
                            styles.order_payment_type_layout_card_button_text
                          } 
                      ${
                        paymentType === 'CASH'
                          ? styles.order_payment_type_layout_card_button_text_active
                          : null
                      }`}
                        >
                          {t('order.cashPaymentType')}
                        </span>
                      </button>
                    </div>
                    {paymentType === 'CARD' && (
                      <div
                        className={
                          styles.order_payment_type_layout_card_options
                        }
                      >
                        <img
                          src={payme}
                          alt='payme'
                          onClick={() => setCardProvider('PAYME')}
                          className={`${
                            styles.order_payment_type_layout_card_options_icon
                          } ${
                            cardProvider === 'PAYME'
                              ? styles.order_payment_type_layout_card_options_icon_active
                              : ''
                          }`}
                        />
                        <img
                          src={uzum}
                          alt='uzum'
                          onClick={() => setCardProvider('UZUM')}
                          className={`${
                            styles.order_payment_type_layout_card_options_icon
                          } ${
                            cardProvider === 'UZUM'
                              ? styles.order_payment_type_layout_card_options_icon_active
                              : ''
                          }`}
                        />
                        <img
                          src={click}
                          alt='click'
                          onClick={() => setCardProvider('CLICK')}
                          className={`${
                            styles.order_payment_type_layout_card_options_icon
                          } ${
                            cardProvider === 'CLICK'
                              ? styles.order_payment_type_layout_card_options_icon_active
                              : ''
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Billing */}
              <div className={styles.order_submit_order}>
                <div className={styles.order_submit_order_layout}>
                  <div className={styles.order_submit_order_layout_heading}>
                    <h1
                      className={styles.order_submit_order_layout_heading_title}
                    >
                      {t('order.toBePaid')} :{' '}
                    </h1>

                    <h3
                      className={
                        styles.order_submit_order_layout_heading_total_price
                      }
                    >
                      {totalPrice.toLocaleString('ru-RU').replace(/,/g, ' ')}{' '}
                      so'm
                    </h3>
                  </div>
                  <button
                    disabled={
                      !user ||
                      cart.length === 0 ||
                      !address_form.address ||
                      !address_form.phone_number ||
                      !address_form.floor ||
                      !address_form.apartment
                    }
                    onClick={handleSubmitOrder}
                    className={styles.order_submit_order_layout_button}
                  >
                    <span>{t('order.pay')}</span>
                  </button>
                </div>
              </div>
            </>
          )
        ) : (
          // If user don't authorized
          <div className={styles.order_not_authorized}>
            <h1 className={styles.order_not_authorized_title}>
              {t('empty')}...
            </h1>
            <div className={styles.order_not_authorized_layout}>
              <p className={styles.order_not_authorized_layout_text}>
                {t('orderText')}{' '}
                <Link to='/auth/register'>{t('register')}</Link>{' '}
                <span>{t('or')}</span>{' '}
                <Link to='/auth/login'>{t('login')}</Link>
              </p>
              <div className={styles.order_not_authorized_layout_buttons}>
                <Link to='/auth/register'>
                  <button
                    className={
                      styles.order_not_authorized_layout_buttons_register
                    }
                  >
                    <span>{t('register')}</span>
                  </button>
                </Link>
                <Link to='/auth/login'>
                  <button
                    className={styles.order_not_authorized_layout_buttons_login}
                  >
                    <span>{t('login')}</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
