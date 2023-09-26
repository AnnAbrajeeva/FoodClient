import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import Button from 'components/Button';
import FavoriteRecipesStore from 'store/FavoriteRecipesStore';
import { useLocalStore } from 'utils/useLocalStore';
import styles from './ActionSlot.module.scss';

type ActionSlotProps = {
  id: number;
};

const ActionSlot: FC<ActionSlotProps> = ({ id }) => {
  const recipesStore = useLocalStore(() => new FavoriteRecipesStore());
  // const { recipesStore } = useStores();
  const [save, setSave] = useState(recipesStore.isFavorite(id));

  const saveRecipe = (id: number) => {
    if (recipesStore.isFavorite(id)) {
      recipesStore.removeFavorite(id);
      setSave(false);
    } else {
      recipesStore.addToFavorite(id);
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
