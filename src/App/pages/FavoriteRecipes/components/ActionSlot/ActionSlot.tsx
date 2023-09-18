import { FC, memo, useState } from 'react';
import Button from 'components/Button';
import { getLocalItem, removeLocalItem, setLocalItem } from 'utils/localStorage';
import styles from './ActionSlot.module.scss';

type ActionSlotProps = {
  id: number;
};

const ActionSlot: FC<ActionSlotProps> = ({ id }) => {
  const [save, setSave] = useState(isSaved(id));

  const saveRecipe = (id: number) => {
    if (isSaved(id)) {
      removeLocalItem('recipes', id);
      setSave(false);
    } else {
      setLocalItem('recipes', id);
      setSave(true);
    }
  };

  function isSaved(id: number) {
    const localRecipes: number[] = getLocalItem('recipes');
    return localRecipes.includes(id);
  }

  return (
    <Button onClick={() => saveRecipe(id)} className={styles['action-btn']}>
      {save ? 'Delete' : 'Save'}
    </Button>
  );
};

export default memo(ActionSlot);
