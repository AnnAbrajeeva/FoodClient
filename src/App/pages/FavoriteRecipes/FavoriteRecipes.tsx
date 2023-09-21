import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import Container from 'components/Container';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';
import { API_KEY } from 'config/api/api';
import { StoresContext } from 'utils/favoriteContext';
import { Meta } from 'utils/meta';

import RecipesWrapper from './components/RecipesWrapper';
import s from './FavoriteRecipes.module.scss';

const FavoriteRecipes = () => {
  const { list, favoriteIds, getFavoriteRecipesList, meta } = useContext(StoresContext);

  useEffect(() => {
    const ids = favoriteIds;
    if (ids.length > 0) {
      const idArr = ids.join(',');
      getFavoriteRecipesList({ ids: idArr, apiKey: API_KEY });
    }
  }, [list]);

  return (
    <div className={s.favorite}>
      <Container>
        {meta === Meta.loading && <Loader size="l" />}
        {list.length > 0 ? <RecipesWrapper recipes={list} /> : <NotFound />}
      </Container>
    </div>
  );
};

export default observer(FavoriteRecipes);
