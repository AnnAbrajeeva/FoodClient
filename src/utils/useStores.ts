import { createContext, useContext } from 'react';
import RecipesStore from 'store/RecipesStore';
import { useLocalStore } from 'utils/useLocalStore';

const useStoresContext = () => {
 return createContext({
    recipesStore: useLocalStore(() => new RecipesStore()),
  });
};

export const useStores = () => useContext(useStoresContext());
