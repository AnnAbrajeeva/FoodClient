import Text from 'components/Text';
import s from './ShoppingList.module.scss';
import { useEffect } from 'react';
import rootStore from 'store/RootStore/instance';
import { observer } from 'mobx-react-lite';
import Container from 'components/Container';
import ListItem from './components/ListItem';

const ShoppingList = () => {
  useEffect(() => {
    const getList = async () => {
      rootStore.shoppingList.getShoppingList();
    };
    getList();
  }, []);

  return (
    <div className={s.shop}>
      <Container>
        <Text className={s.shop__title} tag="h1" weight="bold" view="title">
          Shopping List
        </Text>
        <ul className={s.shop__list}>
          {rootStore.shoppingList.list?.map((product) => {
            return <ListItem key={product.id} product={product} />;
          })}
        </ul>
      </Container>
    </div>
  );
};

export default observer(ShoppingList);
