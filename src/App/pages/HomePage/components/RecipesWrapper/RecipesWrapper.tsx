import Card from 'components/Card';
import { Ingredient, Recipe } from '../../types';
import styles from './RecipesWrapper.module.scss';

type RecipesWrapperProps = {
  recipes: Recipe[];
};

const RecipesWrapper = ({ recipes }: RecipesWrapperProps) => {
  const getProducts = (ingredients: Ingredient[]) => {
    return ingredients.map((item) => item.name).join(' + ');
  };

  console.log(recipes);

  return (
    <div className={styles["recipes-wrapper"]}>
      {recipes.map((recipe) => (
        <Card subtitle={recipe.nutrition.ingredients ? getProducts(recipe.nutrition.ingredients) : ''} title={recipe.title} image={recipe.image} key={recipe.id} />
      ))}
    </div>
  );
};

export default RecipesWrapper;
