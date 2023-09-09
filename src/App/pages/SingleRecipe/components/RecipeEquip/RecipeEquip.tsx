import { FC } from 'react';
import Text from 'components/Text';
import { RecipeInstra } from '../../types';
import RecipeIngredient from '../RecipeIngredient';
import styles from './RecipeEquip.module.scss';

type RecipeEquipProps = {
  title: string;
  icon: string;
  equipments: RecipeInstra[];
};


const RecipeEquip: FC<RecipeEquipProps> = ({ title, icon, equipments }) => {
    const steps = equipments[0].steps.map((step) => step.equipment) 
    const equip = steps.map((item) => {
        return item.map((val) => val.name)
    })

    const arr = equip.reduce((acc, item) => acc.concat(item))

  return (
    <div className={styles["recipe-list"]}>
      <Text weight="medium" view="p-20">
        {title}
      </Text>
      <div className={styles['recipe-list__ingred']}>
        {equip.length && arr.map((item, i) => (
          <RecipeIngredient key={i} value={item} icon={icon} />
        ))}
      </div>
    </div>
  );
};

export default RecipeEquip;
