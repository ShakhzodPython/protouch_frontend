import { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from './ProductPage.module.scss';
import checkIcon from '../../../assets/icons/check_icon.svg';
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs';
import { Breadcrumbs } from '../../../components/Breadcrumbs/Breadcrumbs';
import { useCategory, useProduct } from '../../../hooks/useProduct';
import { Product } from '../../../components/Product/Product';
import { Pagination } from '../../../components/Pagination/Pagination';

export function ProductPage() {
  const { t } = useTranslation();
  const breadcrumbs = useBreadcrumbs();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categories } = useCategory();

  const [filterVisible, setFilterVisible] = useState<boolean>(true);

  const [selectedSlug, setSelectedSlug] = useState<Array<string>>([]);
  const [selectedChildSlug, setSelectedChildSlug] = useState<Array<string>>([]);
  const [expandedParentSlug, setExpandedParentSlug] = useState<Array<string>>(
    []
  );
  const [selectedBrand, setSelectedBrand] = useState<Array<string>>([]);

  const { data: products } = useProduct(
    currentPage,
    selectedSlug.join(','),
    selectedBrand.join(',')
  );
  const totalPages = Math.ceil((products?.count ?? 0) / 12);

  const toggleSlug = (slug: string) => {
    setSelectedSlug((prev) => {
      let updated = [...prev];

      const parent = categories?.find((cat) =>
        cat.children?.some((child) => child.slug === slug)
      );

      if (parent) {
        // Это подкатегория
        const isSelected = updated.includes(slug);

        if (isSelected) {
          updated = updated.filter((s) => s !== slug);

          // Если после удаления это была последняя подкатегория, вернуть родителя
          const otherSelectedChildren = parent.children.filter((child) =>
            updated.includes(child.slug)
          );

          if (otherSelectedChildren.length === 0) {
            updated.push(parent.slug);
          }
        } else {
          // Выбираем подкатегорию
          updated.push(slug);

          // Удаляем родителя временно
          updated = updated.filter((s) => s !== parent.slug);
        }
      } else {
        // Это родитель
        const currentParent = categories?.find((cat) => cat.slug === slug);

        if (currentParent?.children) {
          // Удаляем все дочерние категории при выборе родителя
          updated = updated.filter(
            (s) => !currentParent.children.some((child) => child.slug === s)
          );
        }

        if (updated.includes(slug)) {
          updated = updated.filter((s) => s !== slug);
        } else {
          updated.push(slug);
        }
      }

      return updated;
    });

    // Обновим отображение брендов
    setSelectedChildSlug((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrand((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleParentClick = (slug: string) => {
    setExpandedParentSlug((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    toggleSlug(slug);
  };

  return (
    <div className={styles.page}>
      <div className={styles.page_container}>
        <Breadcrumbs items={breadcrumbs} />
        <div className={filterVisible ? styles.page_content : ''}>
          <div className={styles.page_content_layout}>
            <div className={styles.page_content_filters}>
              <button
                onClick={() => setFilterVisible((prev) => !prev)}
                className={styles.page_content_filters_button}
              >
                <h3 className={styles.page_content_filters_button_title}>
                  {filterVisible ? t('hideFilter') : t('showFilter')}
                </h3>
                <Settings2 />
              </button>
            </div>
            <div className={styles.page_content_sidebar}>
              {filterVisible && (
                <aside className={styles.page_content_sidebar_aside}>
                  <div className={styles.page_content_sidebar_aside_heading}>
                    <h3
                      className={
                        styles.page_content_sidebar_aside_heading_title
                      }
                    >
                      {t('productsCatalog')}
                    </h3>
                    <ul className={styles.page_content_sidebar_aside_list}>
                      {categories?.map((category) => (
                        <div key={category.id}>
                          <li
                            className={
                              styles.page_content_sidebar_aside_list_link
                            }
                          >
                            <div
                              onClick={() => handleParentClick(category.slug)}
                              className={`${
                                styles.page_content_sidebar_aside_list_link_checkbox
                              } ${
                                selectedSlug.includes(category.slug) ||
                                category.children.some((child) =>
                                  selectedSlug.includes(child.slug)
                                )
                                  ? styles.page_content_sidebar_aside_list_link_checkbox_checked
                                  : ''
                              }`}
                            >
                              {(selectedSlug.includes(category.slug) ||
                                category.children.some((child) =>
                                  selectedSlug.includes(child.slug)
                                )) && <img src={checkIcon} alt='check' />}
                            </div>
                            <span>{category.title}</span>
                          </li>

                          {/*  Show categories children */}
                          {expandedParentSlug.includes(category.slug) &&
                            category.children.length > 0 && (
                              <ul
                                className={
                                  styles.page_content_sidebar_aside_children_list
                                }
                              >
                                {category.children.map((child) => (
                                  <li key={child.id}>
                                    <div
                                      className={
                                        styles.page_content_sidebar_aside_children_list_link
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSlug(child.slug);
                                      }}
                                    >
                                      <div
                                        className={`${
                                          styles.page_content_sidebar_aside_list_link_checkbox
                                        } ${
                                          selectedSlug.includes(child.slug)
                                            ? styles.page_content_sidebar_aside_list_link_checkbox_checked
                                            : ''
                                        }`}
                                      >
                                        {selectedSlug.includes(child.slug) && (
                                          <img src={checkIcon} alt='check' />
                                        )}
                                      </div>
                                      <span>{child.title}</span>
                                    </div>

                                    {/* Category child brands */}
                                    {selectedChildSlug.includes(child.slug) &&
                                      child.brands &&
                                      child.brands.length > 0 && (
                                        <ul
                                          className={
                                            styles.page_content_sidebar_aside_brand_list
                                          }
                                        >
                                          {child.brands.map((brand) => (
                                            <li key={brand.id}>
                                              <div
                                                className={
                                                  styles.page_content_sidebar_aside_brand_list_link
                                                }
                                              >
                                                <div
                                                  onClick={() =>
                                                    toggleBrand(brand.title)
                                                  }
                                                  className={`${
                                                    styles.page_content_sidebar_aside_list_link_checkbox
                                                  } ${
                                                    selectedBrand.includes(
                                                      brand.title
                                                    )
                                                      ? styles.page_content_sidebar_aside_list_link_checkbox_checked
                                                      : ''
                                                  }`}
                                                >
                                                  {selectedBrand.includes(
                                                    brand.title
                                                  ) && (
                                                    <img
                                                      src={checkIcon}
                                                      alt='check'
                                                    />
                                                  )}
                                                </div>
                                                <span>{brand.title}</span>
                                              </div>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>
                      ))}
                    </ul>
                  </div>
                </aside>
              )}
            </div>
          </div>
          {/* Products */}
          <div className={styles.page_products_container}>
            <Product
              products={products?.results || []}
              isSidebarOpen={filterVisible}
            />
          </div>
        </div>
        {/* Pagination */}
        {products?.results.length && products.results.length >= 1 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        ) : null}
      </div>
    </div>
  );
}
