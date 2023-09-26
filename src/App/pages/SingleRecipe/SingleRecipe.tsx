import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'components/Button';
import Container from 'components/Container';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';
import Text from 'components/Text';
import Arrow from 'components/icons/Arrow';
import { useLocalStore } from 'hooks/useLocalStore';
import RecipeFullStore from 'store/RecipeFullStore';
import SimilarRecipesStore from 'store/SimilarRecipesStore';
import { goBack } from 'utils/goBackToPrevPage';
import { Meta } from 'utils/meta';
import SimilarRecipes from './components/SimilarRecipes';
import SingleRecipeDescr from './components/SingleRecipeDescr';
import styles from './SingleResipe.module.scss';

const SingleRecipe = () => {
  const recipesStore = useLocalStore(() => new RecipeFullStore());
  const similarRecipesStore = useLocalStore(() => new SimilarRecipesStore());
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    recipesStore.fetchRecipe({ id });
    similarRecipesStore.fetchSimilarIds({ id });
  }, [id, recipesStore, similarRecipesStore]);

  return (
    <div className={styles.recipe}>
      <Container>
        {recipesStore.meta === Meta.loading && <Loader size="l" />}

        {!recipesStore.recipe && similarRecipesStore.list.length < 0 && recipesStore.meta === Meta.success && <NotFound />}

        {recipesStore.meta === Meta.success && (
          <>
            <div className={styles.recipe__title}>
              <Button onClick={() => goBack(navigate)} className={styles.recipe__back}>
                <Arrow width={32} height={32} color="#B5460F" />
              </Button>
              <Text weight="bold" view="title">
                {recipesStore.recipe?.title ? recipesStore.recipe.title : 'Go back'}
              </Text>
            </div>

            {recipesStore.recipe && <SingleRecipeDescr recipe={recipesStore.recipe} />}

            {similarRecipesStore.list.length > 0 && <SimilarRecipes loading={recipesStore.meta} recipes={similarRecipesStore.list} />}
          </>
        )}
      </Container>
    </div>
  );
};

export default observer(SingleRecipe);
