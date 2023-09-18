import { createContext } from "react";
import FavoriteRecipesStore from "store/FavoriteRecipesStore";

export const StoresContext = createContext(new FavoriteRecipesStore());