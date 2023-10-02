import { ShoppingItemModel } from 'entites/ShoppingItem';
import s from './ListItem.module.scss';
import { FC } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import { Meta } from 'utils/meta';

type ListItemProps = {
  product: ShoppingItemModel;
};

const ListItem: FC<ListItemProps> = ({ product }) => {

    const deleteProduct = (id: number) => {
        rootStore.shoppingList.deleteFromShoppingList(id)
    }
  return (
    <li className={s.item}>
      <img className={s.item__img} src={product.img} alt={product.name} />
      <Text view="p-14">{product.name}</Text>
      <Button onClick={() => deleteProduct(product.ingredientId)} loading={rootStore.shoppingList.meta === Meta.loading} className={s.item__btn}>
        Delete
      </Button>
    </li>
  );
};

export default ListItem;
