import { createContext } from 'react';
import { AuthContextType } from '../types/authService.types';

export const AuthContext = createContext<AuthContextType | null>(null);
