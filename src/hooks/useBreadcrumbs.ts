import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { breadcrumbKeys } from '../utils/breadcrumbs';
import { useCategory } from './useProduct';

export function useBreadcrumbs() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const { data: categories } = useCategory();

  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, id) => {
    const url = '/' + segments.slice(0, id + 1).join('/');

    const matchedCategory = categories?.find(
      (category) => category.slug === segment
    );

    const translationKey = segment.replace(/-/g, '_');

    const name = matchedCategory
      ? matchedCategory.title
      : t(
          `breadcrumbs.${breadcrumbKeys[translationKey] || translationKey}`,
          segment
        ).replace(/^./, (breadcrumb) => breadcrumb.toUpperCase());

    return {
      name,
      url,
    };
  });

  return [{ name: t('main'), url: '/' }, ...breadcrumbs];
}
