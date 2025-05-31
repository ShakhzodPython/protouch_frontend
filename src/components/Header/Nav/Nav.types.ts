import { JSX } from 'react';

export type IconsType = {
  component: JSX.Element;
  url?: string;
};

export type LinksType = {
  name: string,
  url: string
}

export type NavLinksProps = {
  activeLink: string | null;
  setActiveLink: (link: string | null) => void;
};

export type NavIconsProps = {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  toggleCart: () => void;
  toggleSearch: () => void;
  setActiveLink: (link: string | null) => void;
};
