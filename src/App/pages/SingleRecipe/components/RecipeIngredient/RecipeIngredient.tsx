import { FC } from 'react';
import Text from 'components/Text';
import styles from './RecipeIngredient.module.scss';

type RecipeIngredientProps = {
  value: string;
  icon: string;
};

const RecipeIngredient: FC<RecipeIngredientProps> = ({ value, icon }) => {
  return (
    <div className={styles.ingredient}>
      <img src={icon} alt="dish" />
      <Text view="p-16">{value}</Text>
    </div>
  );
};

export default RecipeIngredient;
