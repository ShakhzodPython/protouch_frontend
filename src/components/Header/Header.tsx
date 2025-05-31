import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './Header.module.scss';
import headerLogo from '../../assets/icons/logo.png';
import { NavLinks } from './Nav/NavLinks';
import { NavIcons } from './Nav/NavIcons';
import { Cart } from '../Cart/Cart';
import { Search } from '../Search/Search';

export function Header() {

  const location = useLocation();

  const [shadow, setShadow] = useState<boolean>(false);

  const [activeLink, setActiveLink] = useState<string | null>(
    localStorage.getItem('activeLink') || ''
  );

  const [isCartOpen, setIsCartOpen] = useState<boolean>(() => {
    return localStorage.getItem('isCartOpen') === 'true';
  });

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(() => {
    return localStorage.getItem('isSearchOpen') === 'true';
  });

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close cart, search and burger when navigating to another page
  useEffect(() => {
    setIsCartOpen(false);
    setIsSearchOpen(false);
    localStorage.removeItem('isCartOpen');
    localStorage.removeItem('isSearchOpen');
  }, [location.pathname]);

  const toggleCart = (): void => {
    setIsCartOpen((prev) => !prev);
  };

  const toggleSearch = (): void => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleCart}
          className={styles.header_nav_backdrop}
        />
      )}

      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSearch}
          className={styles.header_nav_backdrop}
        />
      )}

      <header
        className={`${styles.header} ${shadow ? styles.header_shadow : ''}`}
      >
        <div className={styles.header_container}>
          <nav className={styles.header_nav}>
            <div className={styles.header_nav_logo}>
              <Link to='/'>
                <img src={headerLogo} alt='header-logo' />
              </Link>
            </div>
                <NavLinks
                  activeLink={activeLink}
                  setActiveLink={setActiveLink}
                />
                <NavIcons
                  isCartOpen={isCartOpen}
                  isSearchOpen={isSearchOpen}
                  toggleCart={toggleCart}
                  toggleSearch={toggleSearch}
                  setActiveLink={setActiveLink}
                />
          </nav>
          <AnimatePresence>{isCartOpen && <Cart />}</AnimatePresence>
          <AnimatePresence>{isSearchOpen && <Search />}</AnimatePresence>
        </div>
      </header>
    </>
  );
}
