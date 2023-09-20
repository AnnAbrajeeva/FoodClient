import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Container from 'components/Container';
import Loader from 'components/Loader';
import Text from 'components/Text';
import Arrow from 'components/icons/Arrow';
import { RecipeFull } from 'utils/entityTypes';
import { goBack } from 'utils/goBackToPrevPage';
import { api, API_KEY } from '../../../config/api/api';
import Directions from './components/Directions';
import RecipeEquip from './components/RecipeEquip';
import RecipeList from './components/RecipeList';
import RecipeParam from './components/RecipeParam';
import styles from './SingleResipe.module.scss';

const SingleRecipe = () => {
  const [recipe, setRecipe] = useState<RecipeFull | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecipe() {
      try {
        setIsLoading(true);
        const res = await api.get(`recipes/${id}/information?apiKey=${API_KEY}`);
        setRecipe(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    }
    getRecipe();
  }, [id]);

  const preparation =
    recipe?.preparationMinutes && recipe.preparationMinutes > 0 ? `${recipe.preparationMinutes} minutes` : 'unknown';

  const cooking = recipe?.cookingMinutes && recipe.cookingMinutes > 0 ? `${recipe.cookingMinutes} minutes` : 'unknown';

  const totalReady = recipe?.readyInMinutes ? `${recipe.readyInMinutes} minutes` : 'unknown';

  const likes = recipe?.aggregateLikes ? `${recipe.aggregateLikes} likes` : 'unknown';

  const serving = recipe?.servings ? `${recipe.servings} serving` : 'unknown';

  const hasBorder = (recipe && recipe.extendedIngredients.length > 0 && recipe.analyzedInstructions.length > 0) ? "recipe-list--border" : '';


  return (
    <div className={styles.recipe}>
      <Container>
        {isLoading ? (
          <Loader size='l' />
        ) : (
          <>
            <div className={styles.recipe__title}>
              <Button onClick={() => goBack(navigate)} className={styles.recipe__back}>
               <Arrow width={32} height={32} color='#B5460F' />
              </Button>
              <Text weight="bold" view="title">
                {recipe?.title}
              </Text>
            </div>
            <div className={styles.recipe__header}>
              <div className={styles.recipe__img}>
                <img src={recipe?.image} alt={recipe?.title} />
              </div>
              <div className={styles.recipe__params}>
                <RecipeParam title="Preparation" param={preparation} />
                <RecipeParam title="Cooking" param={cooking} />
                <RecipeParam title="Total" param={totalReady} />
                <RecipeParam title="Ratings" param={likes} />
                <RecipeParam title="Servings" param={serving} />
              </div>
            </div>
            <div
              className={styles.recipe__descr}
              dangerouslySetInnerHTML={{ __html: recipe?.summary ? recipe.summary : '' }}
            />

            <div className={styles.recipe__products}>
              {recipe?.extendedIngredients && (
                <RecipeList className={hasBorder} title="Ingredients" extendedIngredients={recipe.extendedIngredients} />
              )}
              {recipe?.extendedIngredients && (
                <RecipeEquip title="Equipment" equipments={recipe.analyzedInstructions} />
              )}
            </div>

            {recipe?.analyzedInstructions && <Directions steps={recipe.analyzedInstructions} />}
          </>
        )}
      </Container>
    </div>
  );
};

export default SingleRecipe;
