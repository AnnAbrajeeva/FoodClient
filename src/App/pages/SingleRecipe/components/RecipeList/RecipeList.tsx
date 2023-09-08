import { FC } from 'react';
import Text from 'components/Text';
import RecipeIngredient from '../RecipeIngredient';
import styles from './RecipeList.module.scss';

type RecipeListProps = {
  title: string;
  icon: string;
  ingredients: Ingredient[];
};

export type Ingredient = {
  original: string;
};

const RecipeList: FC<RecipeListProps> = ({ title, icon, ingredients }) => {
  return (
    <div className={styles["recipe-list"]}>
      <Text weight="medium" view="p-20">
        {title}
      </Text>
      <div className={styles['recipe-list__ingred']}>
        {ingredients.map((item, i) => (
          <RecipeIngredient key={i} value={item.original} icon={icon} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
