import { FC } from 'react';
import RecipesWrapper from 'components/RecipesWrapper';
import Text from 'components/Text';
import { RecipeModel } from 'entites/Recipe';
import { Meta } from 'utils/meta';
import s from './SimilarRecipes.module.scss';

type SimilarRecipesProps = {
  recipes: RecipeModel[];
  loading: Meta;
};

const SimilarRecipes: FC<SimilarRecipesProps> = ({ recipes, loading }) => {
  return (
    <div className={s.recipes}>
      <Text tag="h2" view="title">
        Similar recipes
      </Text>
      <RecipesWrapper loading={loading} recipes={recipes} />
    </div>
  );
};

export default SimilarRecipes;
