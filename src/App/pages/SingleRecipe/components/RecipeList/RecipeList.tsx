import { FC } from 'react';
import Text from 'components/Text';
import RecipeIngredient from '../RecipeIngredient';
import styles from './RecipeList.module.scss';

type RecipeListProps = {
  title: string;
  icon: string;
  extendedIngredients: Ingredient[];
};

export type Ingredient = {
    id: number,
    aisle: string,
    image: string,
    consistency: string,
    name: string,
    nameClean: string,
    original: string,
    originalName: string,
    amount: number,
    unit: string,
    meta: [],
};

const RecipeList: FC<RecipeListProps> = ({ title, icon, extendedIngredients }) => {
  return (
    <div className={styles["recipe-list"]}>
      <Text weight="medium" view="p-20">
        {title}
      </Text>
      <div className={styles['recipe-list__ingred']}>
        {extendedIngredients.map((item, i) => (
          <RecipeIngredient key={i} value={item.original} icon={icon} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
