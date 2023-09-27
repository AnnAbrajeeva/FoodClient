import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Container from 'components/Container';
import RecipesWrapper from 'components/RecipesWrapper';
import rootStore from 'store/RootStore/instance';
import s from './FavoriteRecipes.module.scss';

const FavoriteRecipes = () => {
  const { list, favoriteIds, getFavoriteRecipesList, meta } = rootStore.favoriteRecipesStore;

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
        <RecipesWrapper loading={meta} recipes={list} />
      </Container>
    </div>
  );
};

export default observer(FavoriteRecipes);
