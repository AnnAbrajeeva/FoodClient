import { FC } from 'react';
import RecipesWrapper from 'components/RecipesWrapper';
import Text from 'components/Text';
import { RecipeModel } from 'entites/Recipe';
import s from './SimilarRecipes.module.scss';

type SimilarRecipesProps = {
    recipes: RecipeModel[];
}

const SimilarRecipes: FC<SimilarRecipesProps> = ({recipes}) => {
  return (
    <div className={s.recipes}>
      <Text tag="h2" view="title">
        Similar recipes
      </Text>
      <RecipesWrapper recipes={recipes} />
    </div>
  );
};


export default SimilarRecipes;