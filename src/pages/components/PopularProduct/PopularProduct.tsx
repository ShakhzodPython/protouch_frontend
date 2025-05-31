import { useEffect, useState } from 'react';

import styles from './PopularProduct.module.scss';
import {
  useCategory as usePopularProduct,
  useProduct,
} from '../../../hooks/useProduct';
import { Product } from '../../../components/Product/Product';
import { useTranslation } from 'react-i18next';

export function PopularProduct() {
  const { t } = useTranslation();
  const { data: popularProducts } = usePopularProduct('false');

  const getStoredSlug = () => localStorage.getItem('selectedSlug');
  const [slug, setSlug] = useState<string | null>(getStoredSlug);

  const { data: products } = useProduct(1, slug || '');

  // If no slug is stored, set the first parent category slug by default
  useEffect(() => {
    if (!slug && popularProducts?.length) {
      const firstParentSlug = popularProducts[0];
      setSlug(firstParentSlug.slug);
      localStorage.setItem('selectedSlug', firstParentSlug.slug);
    }
  }, [slug, popularProducts]);

  const handleSelectedSlug = (slug: string) => {
    setSlug(slug);
    localStorage.setItem('selectedSlug', slug);
  };

  return (
    <div className={styles.popular_products}>
      <div className={styles.popular_products_container}>
        {popularProducts?.map((popularProduct) => (
          <div
            key={popularProduct.id}
            className={styles.popular_products_content}
          >
            <h1 className={styles.popular_products_content_title}>
              {popularProduct.title}
            </h1>
            <ul className={styles.popular_products_content_children_list}>
              <li
                onClick={() => handleSelectedSlug(popularProduct.slug)}
                className={`${
                  styles.popular_products_content_children_list_link
                } ${
                  slug === popularProduct.slug
                    ? styles.popular_products_content_children_list_link_active
                    : ''
                }`}
              >
                <span>{t('all')}</span>
              </li>
              {popularProduct.children.map((child) => (
                <li
                  key={child.id}
                  onClick={() => handleSelectedSlug(child.slug)}
                  className={`${
                    styles.popular_products_content_children_list_link
                  } ${
                    slug === child.slug
                      ? styles.popular_products_content_children_list_link_active
                      : ''
                  }`}
                >
                  <span>{child.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Product products={products?.results || []} />
    </div>
  );
}
