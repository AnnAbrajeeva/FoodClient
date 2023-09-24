import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import Container from 'components/Container';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';
import RecipesWrapper from 'components/RecipesWrapper';
import { StoresContext } from 'store/FavoriteRecipesStore/favoriteContext';
import { Meta } from 'utils/meta';
import s from './FavoriteRecipes.module.scss';

const FavoriteRecipes = () => {
  const { list, favoriteIds, getFavoriteRecipesList, meta } = useContext(StoresContext);

  useEffect(() => {
    const ids = favoriteIds;
    if (ids.length > 0) {
      const idArr = ids.join(',');
      getFavoriteRecipesList({ ids: idArr });
    }
  }, [favoriteIds, getFavoriteRecipesList]);

  return (
    <div className={s.favorite}>
      <Container>
        {meta === Meta.loading && <Loader size="l" />}
        {meta === Meta.success && list.length < 0 && <NotFound />}
        {list.length > 0 && <RecipesWrapper recipes={list} />}
      </Container>
    </div>
  );
};

export default observer(FavoriteRecipes);
