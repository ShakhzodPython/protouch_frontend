import { ArrowRight, HeartOff } from 'lucide-react';

import styles from './Favorite.module.scss';
import { Breadcrumbs } from '../../../components/Breadcrumbs/Breadcrumbs';
import { useFavoriteContext } from '../../../hooks/useFavorite';
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs';
import { Link } from 'react-router';

export function Favorite() {
  const breadcrumbs = useBreadcrumbs();
  const { products: favorites, removeFromFavorites } = useFavoriteContext();

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites_container}>
        <Breadcrumbs items={breadcrumbs} />

        {favorites.length === 0 ? (
          <div className={styles.favorites_no_content}>
            <h1 className={styles.favorites_no_content_title}>
              Тут совсем пусто...
            </h1>
            <p className={styles.favorites_no_content_description}>
              Добавьте <Link to='/products'>товары</Link> чтобы хранить,
              <br />и не забывать
            </p>
            <Link to='/products'>
              <button className={styles.favorites_no_content_button}>
                <span>Добавить товары</span>
                <ArrowRight />
              </button>
            </Link>
          </div>
        ) : (
          <div className={styles.favorites_box}>
            <h1 className={styles.favorites_box_title}>Ваши сохраненные</h1>
            <div className={styles.favorites_cards}>
              {favorites.map((favorite) => (
                <div key={favorite.id} className={styles.favorites_cards_card}>
                   <Link to={`/products/product/${favorite.id}`}>
                    <div className={styles.favorites_cards_card_image}>
                      <img src={favorite.image} alt={favorite.title} />
                    </div>
                  </Link>

                  <div className={styles.favorites_cards_card_details}>
                    <div className={styles.favorites_cards_card_details_side}>
                      <h1
                        className={
                          styles.favorites_cards_card_details_side_title
                        }
                      >
                        {favorite.title}
                      </h1>
                      <HeartOff
                        onClick={() => removeFromFavorites(favorite.id)}
                      />
                    </div>
                    <span className={styles.favorites_cards_card_details_price}>
                      {(favorite?.discount?.is_active
                        ? Number(favorite.discount.discounted_price)
                        : Number(favorite?.price)
                      )
                        ?.toLocaleString('ru-RU')
                        .replace(/,/g, ' ')}{' '}
                      so'm
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
