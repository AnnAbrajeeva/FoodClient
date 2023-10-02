import { FC } from 'react';
import { RecipeFullModel } from 'entites/Recipe';
import Directions from '../Directions';
import RecipeEquip from '../RecipeEquip';
import RecipeList from '../RecipeList';
import RecipeParam from '../RecipeParam';
import styles from './SingleRecipeDescr.module.scss';
import ProductsList from '../ProductsList';
import rootStore from 'store/RootStore/instance';

type SingleRecipeDescrProps = {
  recipe: RecipeFullModel;
};

const SingleRecipeDescr: FC<SingleRecipeDescrProps> = ({ recipe }) => {
  const { title, recipeParams, extendedIngredients, image, summary, analyzedInstructions } = recipe;

  const hasBorder =
    extendedIngredients && extendedIngredients.length > 0 && analyzedInstructions && analyzedInstructions.length > 0
      ? 'recipe-list--border'
      : '';

  return (
    <div className={styles.recipe}>
      <div className={styles.recipe__header}>
        <div className={styles.recipe__img}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.recipe__params}>
          {recipeParams &&
            Object.entries(recipeParams).map(([key, value]) => <RecipeParam key={key} title={key} param={value} />)}
        </div>
      </div>
      <div className={styles.recipe__descr} dangerouslySetInnerHTML={{ __html: summary ? summary : '' }} />

      <div className={styles.recipe__products}>
        {extendedIngredients && (
          <RecipeList className={hasBorder} title="Ingredients" extendedIngredients={extendedIngredients} />
        )}
        {analyzedInstructions && (
          <>
            <RecipeEquip title="Equipment" equipments={analyzedInstructions} />
            <Directions steps={analyzedInstructions} />
          </>
        )}
          {extendedIngredients.length > 0 && rootStore.userStore.user && (
          <ProductsList extendedIngredients={extendedIngredients} />
        )}
      </div>
    </div>
  );
};

export default SingleRecipeDescr;
