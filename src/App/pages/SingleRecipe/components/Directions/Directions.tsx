import { FC } from 'react';
import Text from 'components/Text';
import { RecipeInstra } from '../../types';
import Step from '../Step';
import styles from './Directions.module.scss';

type DirectionsProps = {
  steps: RecipeInstra[];
};


const Directions: FC<DirectionsProps> = ({ steps }) => {
    const instructions = steps[0].steps;

  return (
    <div className={styles.directions}>
      <Text weight='medium' view="p-20">Directions</Text>
      <div className={styles.directions__wrapper}>
        {instructions.map((item, i) => {
          return <Step key={i} value={item.step} index={item.number} />;
        })}
      </div>
    </div>
  );
};

export default Directions;
