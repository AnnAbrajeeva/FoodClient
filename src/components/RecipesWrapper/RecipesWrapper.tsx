
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import ActionSlot from 'components/ActionSlot';

import CaptionSlot from 'components/CaptionSlot';
import Card from 'components/Card';
import ContentSlot from 'components/ContentSlot';
import { getProducts } from 'entites/Ingredient';
import { RecipeModel } from 'entites/Recipe';

import styles from './RecipesWrapper.module.scss';


type RecipesWrapperProps = {
  recipes: RecipeModel[];
};

const RecipesWrapper: FC<RecipesWrapperProps> = ({ recipes }) => {
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
            actionSlot={<ActionSlot id={id} />}
            subtitle={nutrition.ingredients ? getProducts(nutrition.ingredients) : ''}
            title={title}
            image={image}
          />
        </Link>
      ))}
    </div>
  );
};

export default memo(RecipesWrapper);
