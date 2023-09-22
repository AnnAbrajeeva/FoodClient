import { observer } from 'mobx-react-lite';
import { FC, useContext, useState } from 'react';
import Button from 'components/Button';
import { StoresContext } from 'store/FavoriteRecipesStore/favoriteContext';
import styles from './ActionSlot.module.scss';

type ActionSlotProps = {
  id: number;
};

const ActionSlot: FC<ActionSlotProps> = ({ id }) => {
  const { isFavorite, addToFavorite, removeFavorite } = useContext(StoresContext);

  const saveRecipe = (id: number) => {
    if (isFavorite(id)) {
      removeFavorite(id);
    
    } else {
      addToFavorite(id);
   
    }
  };

  return (
    <Button onClick={() => saveRecipe(id)} className={styles['action-btn']}>
      {isFavorite(id) ? 'Delete' : 'Save'}
    </Button>
  );
};

export default observer(ActionSlot);
