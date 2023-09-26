import { FC, useMemo } from 'react';
import Equipment from 'assets/img/equipment.svg';
import Text from 'components/Text';
import { RecipeInstructionModel } from 'store/RecipeFullStore/models/recipe';
import RecipeIngredient from '../RecipeIngredient';
import styles from './RecipeEquip.module.scss';

type RecipeEquipProps = {
  title: string;
  equipments: RecipeInstructionModel[];
};

const RecipeEquip: FC<RecipeEquipProps> = ({ title, equipments }) => {
  const steps = useMemo(() => equipments[0].steps.map((step) => step.equipment), [equipments[0].steps, equipments]);

  const equip = useMemo(
    () =>
      steps.map((item) => {
        return item.map((val) => val.name);
      }),
    [steps],
  );

  const arr = Array.from(new Set(equip.reduce((acc, item) => acc.concat(item))));

  return (
    <div className={styles['recipe-list']}>
      <Text className={styles['recipe-list__title']} weight="medium" view="p-20">
        {title}
      </Text>
      <div className={styles['recipe-list__ingred']}>
        {equip.length > 0 && arr.map((item) => <RecipeIngredient key={item} value={item} icon={Equipment} />)}
      </div>
    </div>
  );
};

export default RecipeEquip;
