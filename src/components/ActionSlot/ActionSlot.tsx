import { observer } from 'mobx-react-lite';
import { FC, useContext, useState } from 'react';
import Button from 'components/Button';
import { StoresContext } from 'utils/favoriteContext';
import styles from './ActionSlot.module.scss';

type ActionSlotProps = {
  id: number;
};

const ActionSlot: FC<ActionSlotProps> = ({ id }) => {
  const { isFavorite, addToFavorite, removeFavorite } = useContext(StoresContext);
  const [save, setSave] = useState(isFavorite(id) || false);

  const saveRecipe = (id: number) => {
    if (isFavorite(id)) {
      removeFavorite(id);
      setSave(false);
    } else {
      addToFavorite(id);
      setSave(true);
    }
  };

  return (
    <Button onClick={() => saveRecipe(id)} className={styles['action-btn']}>
      {save ? 'Delete' : 'Save'}
    </Button>
  );
};

export default observer(ActionSlot);
