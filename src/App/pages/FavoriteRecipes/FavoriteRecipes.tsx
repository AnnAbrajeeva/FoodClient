import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Container from 'components/Container';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';
import { API_KEY } from 'config/api/api';
import FavoriteRecipesStore from 'store/FavoriteRecipesStore';
import { StoresContext } from 'utils/favoriteContext';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
// import { useStores } from 'utils/useStores';
import RecipesWrapper from './components/RecipesWrapper';
import s from './FavoriteRecipes.module.scss';

const FavoriteRecipes = () => {
  const recipesStore = useLocalStore(() => new FavoriteRecipesStore());

  useEffect(() => {
    const ids = recipesStore.favoriteIds;
    if (ids.length > 0) {
      const idArr = ids.join(',');
      recipesStore.getFavoriteRecipesList({ ids: idArr, apiKey: API_KEY });
    }
  }, [recipesStore]);

  return (
    <div className={s.favorite}>
      <StoresContext.Provider value={recipesStore}>
        <Container>
          {recipesStore.meta === Meta.loading && <Loader size="l" />}
          {recipesStore.meta === Meta.success && (
            <>{recipesStore.list.length > 0 ? <RecipesWrapper recipes={recipesStore.list} /> : <NotFound />}</>
          )}
        </Container>
      </StoresContext.Provider>
    </div>
  );
};

export default observer(FavoriteRecipes);
