import { useTranslation } from 'react-i18next';
import { FooterColumnType } from '../types/footer.types';

export function FooterColumns() {
  const { t } = useTranslation();
  const columns: Array<FooterColumnType> = [
    {
      title: t('footer.help'),
      columns: [
        { title: t('footer.customerService'), url: '#' },
        { title: t('footer.termsReturn'), url: '#' },
        { title: t('footer.shippingInformation'), url: '#' },
      ],
    },

    {
      title: t('footer.resources'),
      columns: [
        { title: t('footer.giftRegistry'), url: '#' },
        { title: t('footer.giftCards'), url: '#' },
      ],
    },

    {
      title: t('footer.ourCompany'),
      columns: [
        { title: t('footer.aboutUs'), url: '#' },
        { title: t('footer.careers'), url: '#' },
      ],
    },
  ];
  return columns;
}
