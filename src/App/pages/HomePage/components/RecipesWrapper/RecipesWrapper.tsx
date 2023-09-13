import { FC } from 'react';
import { Link } from 'react-router-dom';
import Card from 'components/Card';
import { Ingredient, Recipe } from 'utils/entityTypes';

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
      {recipes.map(({ id, cookingMinutes, readyInMinutes, nutrition, title, image }) => (
        <Link key={id} to={`recipe/${id}`}>
          <Card
            className={styles['recipes-wrapper__card']}
            captionSlot={
              cookingMinutes && cookingMinutes >= 1 ? (
                <CaptionSlot timeToPrepare={cookingMinutes} />
              ) : (
                <CaptionSlot timeToPrepare={readyInMinutes} />
              )
            }
            contentSlot={<ContentSlot options={nutrition.nutrients} />}
            actionSlot={<ActionSlot />}
            subtitle={nutrition.ingredients ? getProducts(nutrition.ingredients) : ''}
            title={title}
            image={image}
          />
        </Link>
      ))}
    </div>
  );
};

export default RecipesWrapper;
