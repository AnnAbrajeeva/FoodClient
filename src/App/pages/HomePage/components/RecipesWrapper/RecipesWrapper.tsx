import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import ActionSlot from 'components/ActionSlot';
import Card from 'components/Card';
import { IngredientModel, RecipeModel } from 'store/RecipesStore/models/recipe';
import CaptionSlot from '../CaptionSlot';
import ContentSlot from '../ContentSlot';
import styles from './RecipesWrapper.module.scss';

type RecipesWrapperProps = {
  recipes: RecipeModel[];
};

const RecipesWrapper: FC<RecipesWrapperProps> = ({ recipes }) => {
  const getProducts = (ingredients: IngredientModel[]) => {
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
