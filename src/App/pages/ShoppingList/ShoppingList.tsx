import Text from 'components/Text';
import s from './ShoppingList.module.scss';
import { useEffect, useState } from 'react';
import rootStore from 'store/RootStore/instance';
import { observer } from 'mobx-react-lite';
import Container from 'components/Container';
import ListItem from './components/ListItem';
import { ShoppingItemModel } from 'entites/ShoppingItem';
import { Meta } from 'utils/meta';
import Loader from 'components/Loader';

const ShoppingList = () => {
  const { list, meta } = rootStore.shoppingList;
  const [products, setProducts] = useState<ShoppingItemModel[]>([]);

  useEffect(() => {
    const getList = async () => {
      await rootStore.shoppingList.getShoppingList();
    };
    if (rootStore.userStore.user) {
      getList();
    }
  }, [rootStore.userStore.user]);

  useEffect(() => {
    if (list && list.length > 0) {
      setProducts(list);
    }
  }, [list]);

  useEffect(() => {
    if (list && list.length > 0) {
      setProducts(list);
    }
  }, [list]);

  return (
    <div className={s.shop}>
      <Container>
        <Text className={s.shop__title} tag="h1" weight="bold" view="title">
          Shopping List
        </Text>
        {!rootStore.userStore.user && <div className={s.shop__attention}>
          <Text>You must login to use the shopping list.</Text>
        </div>}
        {meta === Meta.loading && <Loader />}
        {rootStore.userStore.user && (
          <table className={s.shop__list}>
            <tbody>
              {products?.length > 0 &&
                meta !== Meta.loading &&
                products.map((product) => {
                  return <ListItem key={product.id} product={product} />;
                })}
            </tbody>
          </table>
        )}
      </Container>
    </div>
  );
};

export default observer(ShoppingList);
