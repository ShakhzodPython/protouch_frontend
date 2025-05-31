import { useState } from 'react';
import { Heart, Search, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router';

import styles from '../Header.module.scss';
import { IconsType, NavIconsProps } from './Nav.types';
import { useCartContext } from '../../../hooks/useCart';

export function NavIcons({
  isCartOpen,
  isSearchOpen,
  toggleCart,
  toggleSearch,
  setActiveLink,
}: NavIconsProps) {
  const location = useLocation();

  const { cart } = useCartContext();
  const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const icons: Array<IconsType> = [
    { component: <Search color='#222' /> },
    { component: <ShoppingBag color='#222' /> },
    {
      component: (
        <Heart
          className={`${styles.header_nav_icons_list_link_heart_icon} ${
            location.pathname === '/favorites'
              ? styles.header_nav_icons_list_link_heart_icon_active
              : ''
          }`}
        />
      ),
      url: '/favorites',
    },
  ];

  const [searchRotation, setSearchRotation] = useState(0);
  const [cartRotation, setCartRotation] = useState(0);

  const clearActiveLink = (): void => {
    setActiveLink(null);
    localStorage.removeItem('activeLink');
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSearch();
    setSearchRotation((prev) => prev + 360);

    if (isCartOpen) {
      toggleCart();
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleCart();
    setCartRotation((prev) => prev + 360);

    if (isSearchOpen) {
      toggleSearch();
    }
  };

  return (
    <ul className={styles.header_nav_icons_list}>
      {icons.map((icon, id) => (
        <li
          key={id}
          onClick={(e) => {
            if (icon.component.type === Search) {
              handleSearchClick(e);
            }
            if (icon.component.type === ShoppingBag) {
              e.preventDefault();
              handleCartClick(e);
            }

            if (icon.component.type === Heart) {
              clearActiveLink();
            }
          }}
          className={styles.header_nav_icons_list_link}
        >
          {icon.url && (
            <Link to={icon.url} className={styles.header_nav_icons_list_link}>
              {icon.component}
            </Link>
          )}
          {icon.component.type === ShoppingBag ? (
            <div className={styles.header_nav_icons_list_link_shopping_bag}>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={isCartOpen ? 'close' : 'cart'}
                  animate={{ rotate: cartRotation }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {isCartOpen ? (
                    <X color='#222' />
                  ) : (
                    <ShoppingBag color='#222' />
                  )}
                </motion.div>
              </AnimatePresence>
              {totalCartQuantity > 0 && (
                <div
                  className={
                    styles.header_nav_icons_list_link_shopping_bag_quantity
                  }
                >
                  <span>{totalCartQuantity}</span>
                </div>
              )}
            </div>
          ) : (
            icon.component.type === Search && (
              <AnimatePresence mode='wait'>
                <motion.div
                  key={isSearchOpen ? 'close' : 'search'}
                  animate={{ rotate: searchRotation }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {isSearchOpen ? <X color='#222' /> : <Search color='#222' />}
                </motion.div>
              </AnimatePresence>
            )
          )}
        </li>
      ))}
    </ul>
  );
}
