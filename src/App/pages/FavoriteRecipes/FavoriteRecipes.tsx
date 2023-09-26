import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import Container from 'components/Container';
import RecipesWrapper from 'components/RecipesWrapper';
import { StoresContext } from 'store/FavoriteRecipesStore/favoriteContext';
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
        <RecipesWrapper loading={meta} recipes={list} />
      </Container>
    </div>
  );
};

export default observer(FavoriteRecipes);
