import { FC } from 'react';
import { Link } from 'react-router-dom';
import Card from 'components/Card';
import { Ingredient, Recipe } from '../../types';

import ActionSlot from '../ActionSlot';
import CaptionSlot from '../CaptionSlot';
import ContentSlot from '../ContentSlot';
import styles from './RecipesWrapper.module.scss';

type RecipesWrapperProps = {
  recipes: Recipe[];
};

const RecipesWrapper: FC<RecipesWrapperProps> = ({ recipes }) => {
  const getProducts = (ingredients: Ingredient[]) => {
    return ingredients.map((item) => item.name).join(' + ');
  };

  return (
    <div className={styles['recipes-wrapper']}>
      {recipes.map((recipe) => (
        <Link key={recipe.id} to={`recipe/${recipe.id}`}>
          <Card
            className={styles['recipes-wrapper__card']}
            captionSlot={
              recipe.cookingMinutes && recipe.cookingMinutes >= 1 ? (
                <CaptionSlot text={recipe.cookingMinutes} />
              ) : (
                <CaptionSlot text={recipe.readyInMinutes} />
              )
            }
            contentSlot={<ContentSlot options={recipe.nutrition.nutrients} />}
            actionSlot={<ActionSlot />}
            subtitle={recipe.nutrition.ingredients ? getProducts(recipe.nutrition.ingredients) : ''}
            title={recipe.title}
            image={recipe.image}
            
          />
        </Link>
      ))}
    </div>
  );
};

export default RecipesWrapper;
