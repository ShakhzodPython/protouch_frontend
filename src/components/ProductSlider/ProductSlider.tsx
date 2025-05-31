import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

import styles from './ProductSlider.module.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { useCategory, useChildProduct } from '../../hooks/useProduct';
import { Product } from '../Product/Product';

export function ProductSlider() {
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();

  //  Manage page state per child slug
  const [pages, setPages] = useState<Record<string, number>>({});

  const { category: slug } = useParams<{ category: string }>();
  const { data: categories } = useCategory();

  const currentIndex =
    categories?.findIndex((category) => category.slug === slug) ?? -1;

  const currentCategory = categories?.find(
    (category) => category.slug === slug
  );
  const isValidCategory = categories?.some(
    (category) => category.slug === slug
  );

  const params = useMemo(() => {
    return (
      currentCategory?.children.map((child) => ({
        page: pages[child.slug] || 1,
        slug: child.slug,
      })) ?? []
    );
  }, [currentCategory?.children, pages]);

  const products = useChildProduct(params);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevCategory = categories?.[currentIndex - 1];
      navigate(`/products/${prevCategory?.slug}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < (categories?.length ?? 0) - 1) {
      const nextCategory = categories?.[currentIndex + 1];
      navigate(`/products/${nextCategory?.slug}`);
    }
  };

  const updatePage = (slug: string, direction: 'prev' | 'next') => {
    setPages((prev) => {
      const currentPage = prev[slug] || 1;
      const newPage = direction === 'prev' ? currentPage - 1 : currentPage + 1;
      return {
        ...prev,
        [slug]: Math.max(newPage, 1),
      };
    });
  };

  if (!isValidCategory) {
    return 'Not found page';
  }

  // TODO: Show only four products
  return (
    <div className={styles.product_slider}>
      <div className={styles.product_slider_navbar}>
        <div className={styles.product_slider_navbar_wrapper}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={styles.product_slider_navbar_wrapper_button}
          >
            <ChevronLeft color='#222' />
          </button>
          <span>{currentCategory?.title}</span>
          <button
            onClick={handleNext}
            disabled={currentIndex === (categories?.length ?? 0) - 1}
            className={styles.product_slider_navbar_wrapper_button}
          >
            <ChevronRight color='#222' />
          </button>
        </div>
      </div>
      <div className={styles.product_slider_container}>
        <div className={styles.product_slider_content}>
          <Breadcrumbs items={breadcrumbs} />
          <div className={styles.product_slider_content_layout}>
            {currentCategory?.children.map((child) => {
              return (
                <div key={child.id}>
                  <div className={styles.product_slider_content_layout_heading}>
                    <h1
                      className={
                        styles.product_slider_content_layout_heading_title
                      }
                    >
                      {child.title}
                    </h1>
                    <div
                      className={
                        styles.product_slider_content_layout_heading_buttons
                      }
                    >
                      <button
                        onClick={() => updatePage(child.slug, 'prev')}
                        disabled={(pages[child.slug] || 1) === 1}
                      >
                        <ChevronLeft color='#249ffc' />
                      </button>
                      <button onClick={() => updatePage(child.slug, 'next')}>
                        <ChevronRight color='#249ffc' />
                      </button>
                    </div>
                  </div>
                  <div>
                    <Product
                      products={[
                        ...new Map(
                          products
                            .flatMap((product) => product.data?.results ?? [])
                            .map((item) => [item.id, item])
                        ).values(),
                      ]}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
