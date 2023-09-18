import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'components/Button';
import Container from 'components/Container';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';
import Text from 'components/Text';
import Arrow from 'components/icons/Arrow';
import { API_KEY } from 'config/api/api';
import RecipeFullStore from 'store/RecipeFullStore';
import { goBack } from 'utils/goBackToPrevPage';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import Directions from './components/Directions';
import RecipeEquip from './components/RecipeEquip';
import RecipeList from './components/RecipeList';
import RecipeParam from './components/RecipeParam';
import styles from './SingleResipe.module.scss';

const SingleRecipe = () => {
  const recipesStore = useLocalStore(() => new RecipeFullStore());
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    recipesStore.getRecipe({ apiKey: API_KEY, id });
  }, [id, recipesStore]);

  const { title, recipeParams, extendedIngredients, image, summary, analyzedInstructions } = recipesStore.recipe || {};

  const hasBorder =
    extendedIngredients && extendedIngredients.length > 0 && analyzedInstructions && analyzedInstructions.length > 0
      ? 'recipe-list--border'
      : '';

  return (
    <div className={styles.recipe}>
      <Container>
        {recipesStore.meta === Meta.loading && <Loader size="l" />}

        <div className={styles.recipe__title}>
          <Button onClick={() => goBack(navigate)} className={styles.recipe__back}>
            <Arrow width={32} height={32} color="#B5460F" />
          </Button>
          <Text weight="bold" view="title">
            {title}
          </Text>
        </div>
        {recipesStore.recipe ? (
          <>
            <div className={styles.recipe__header}>
              <div className={styles.recipe__img}>
                <img src={image} alt={title} />
              </div>
              <div className={styles.recipe__params}>
                {recipeParams &&
                  Object.entries(recipeParams).map(([key, value]) => (
                    <RecipeParam key={key} title={key} param={value} />
                  ))}
              </div>
            </div>
            <div className={styles.recipe__descr} dangerouslySetInnerHTML={{ __html: summary ? summary : '' }} />

            <div className={styles.recipe__products}>
              {extendedIngredients && (
                <RecipeList className={hasBorder} title="Ingredients" extendedIngredients={extendedIngredients} />
              )}
              {analyzedInstructions && <RecipeEquip title="Equipment" equipments={analyzedInstructions} />}
            </div>

            {analyzedInstructions && <Directions steps={analyzedInstructions} />}
          </>
        ) : (
          <NotFound />
        )}
      </Container>
    </div>
  );
};

export default observer(SingleRecipe);
