import { createContext } from "react";
import { CartContextType } from "../components/Cart/Cart.types";


export const CartContext = createContext<CartContextType | null>(null)
