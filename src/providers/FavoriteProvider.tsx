import { useState, useEffect } from 'react';
import { ProductType } from '../types/productService.types';
import { FavoriteContext } from '../contexts/FavoriteContext';
import { FavoriteProviderPropsType } from '../pages/components/Favorite/Favorite.types';

export function FavoriteProvider({ children }: FavoriteProviderPropsType) {
  const [products, setProducts] = useState<Array<ProductType>>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setProducts(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(products));
  }, [products]);

  const addToFavorites = (product: ProductType) => {
    if (!products.find((p) => p.id === product.id)) {
      setProducts((prev) => [...prev, product]);
    }
  };

  const removeFromFavorites = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <FavoriteContext.Provider value={{ products, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
}
