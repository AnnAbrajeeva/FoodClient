import { ShoppingItemModel } from 'entites/ShoppingItem';
import s from './ListItem.module.scss';
import { FC } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import { Meta } from 'utils/meta';
import { observer } from 'mobx-react-lite';

type ListItemProps = {
  product: ShoppingItemModel;
};

const ListItem: FC<ListItemProps> = ({ product }) => {
  const deleteProduct = (id: number) => {
    rootStore.shoppingList.deleteFromShoppingList(id);
  };

  return (
    <tr className={s.item}>
      <td className={s.item__wrap}>
        <img className={s.item__img} src={product.img} alt={product.name} />
      </td>
      <td className={s.item__name}>
        <Text className={s.item__text} view="p-14">{product.name}</Text>
      </td>
      <td className={s.item__wrap}>
        <Text view="p-14">{product.measures.original.amount}</Text>
      </td>
      <td className={s["item__btn-wrap"]}>
        <Button
          onClick={() => deleteProduct(product.id)}
          className={s.item__btn}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default observer(ListItem);
