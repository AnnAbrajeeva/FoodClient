import classNames from 'classnames';
import { FC } from 'react';
import Dish from 'assets/img/dish.svg';
import Text from 'components/Text';
import { Ingredient } from 'utils/entityTypes';
import RecipeIngredient from '../RecipeIngredient';
import styles from './RecipeList.module.scss';

type RecipeListProps = {
  title: string;
  extendedIngredients: Ingredient[];
  className: string;
};

const RecipeList: FC<RecipeListProps> = ({ title, extendedIngredients, className }) => {
  const classes = classNames(styles['recipe-list'], styles[className]);
  return (
    <div className={classes}>
      <Text className={styles['recipe-list__title']} weight="medium" view="p-20">
        {title}
      </Text>
      <div className={styles['recipe-list__ingred']}>
        {extendedIngredients.map((item, i) => (
          <RecipeIngredient key={i} value={item.original} icon={Dish} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
