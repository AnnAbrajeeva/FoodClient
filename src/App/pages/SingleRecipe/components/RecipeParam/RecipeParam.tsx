import { FC } from 'react';
import Text from 'components/Text';
import styles from './RecipeParam.module.scss';

type RecipeParamProps = {
  title: string;
  param: number;
};

const RecipeParam: FC<RecipeParamProps> = ({ title, param }) => {
  let paramsValue = '';

  switch (title) {
    case 'Servings':
      paramsValue = param && param > 0 ? `${param} servings` : '—';
      break;

    case 'Ratings':
      paramsValue = param && param > 0 ? `${param} likes` : '—';
      break;

    default:
      paramsValue = param && param > 0 ? `${param} minutes` : '—';
      break;
  }

  return (
    <div className={styles.param}>
      <Text view="p-16">{title}</Text>
      <Text color="accent" view="p-16" weight="medium">
        {paramsValue}
      </Text>
    </div>
  );
};

export default RecipeParam;
