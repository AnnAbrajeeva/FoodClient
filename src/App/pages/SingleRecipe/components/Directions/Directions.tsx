import { FC } from 'react';
import Text from 'components/Text';
import { RecipeInstructionModel } from 'store/RecipeFullStore/models/recipe';
import Step from '../Step';
import styles from './Directions.module.scss';

type DirectionsProps = {
  steps: RecipeInstructionModel[];
};

const Directions: FC<DirectionsProps> = ({ steps }) => {
  const instructions = steps[0].steps;

  return (
    <div className={styles.directions}>
      <Text className={styles.directions__title} weight="medium" view="p-20">
        Directions
      </Text>
      <div className={styles.directions__wrapper}>
        {instructions.map((item) => {
          return <Step key={item.step} value={item.step} index={item.number} />;
        })}
      </div>
    </div>
  );
};

export default Directions;
