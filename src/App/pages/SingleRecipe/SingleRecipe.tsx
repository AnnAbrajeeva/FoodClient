import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dish from 'assets/img/dish.svg';
import Equipment from 'assets/img/equipment.svg';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { api, API_KEY } from '../../../api/api';
import Directions from './components/Directions';
import RecipeEquip from './components/RecipeEquip';
import RecipeList from './components/RecipeList';
import RecipeParam from './components/RecipeParam';
import { RecipeFull } from './types';
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

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  const preparation =
    recipe?.preparationMinutes && recipe.preparationMinutes > 0 ? `${recipe.preparationMinutes} minutes` : 'unknown';

  const cooking = recipe?.cookingMinutes && recipe.cookingMinutes > 0 ? `${recipe.cookingMinutes} minutes` : 'unknown';

  const totalReady = recipe?.readyInMinutes ? `${recipe?.readyInMinutes} minutes` : 'unknown';

  const likes = recipe?.aggregateLikes ? `${recipe?.aggregateLikes} likes` : 'unknown';

  const serving = recipe?.servings ? `${recipe?.servings} serving` : 'unknown';

  return (
    <div className={styles.recipe}>
      <div className="container">
        {isLoading ? (
          <Loader size={'l'} />
        ) : (
          <>
            <div className={styles.recipe__title}>
              <Button onClick={goBack} className={styles.recipe__back}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
                    stroke="#B5460F"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Text weight="bold" view="title">
                {recipe?.title}
              </Text>
            </div>
            <div className={styles.recipe__header}>
              <div className={styles.recipe__img}>
                <img src={recipe?.image} alt="Pancake" />
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
                <RecipeList title="Ingredients" icon={Dish} extendedIngredients={recipe.extendedIngredients} />
              )}
              {recipe?.extendedIngredients && (
                <RecipeEquip title="Equipment" icon={Equipment} equipments={recipe.analyzedInstructions} />
              )}
            </div>

            {recipe && recipe.analyzedInstructions && <Directions steps={recipe.analyzedInstructions} />}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleRecipe;
