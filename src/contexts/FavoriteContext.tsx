import { createContext } from 'react';
import { FavoriteContextType } from '../pages/components/Favorite/Favorite.types';

export const FavoriteContext = createContext<FavoriteContextType | null>(null);
