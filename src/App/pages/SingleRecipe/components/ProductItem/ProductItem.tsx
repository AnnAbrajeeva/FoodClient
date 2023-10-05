import Counter from 'components/Counter';
import s from './ProductItem.module.scss';
import Button from 'components/Button';
import Text from 'components/Text';
import { IngredientModel } from 'entites/Ingredient';
import { FC, useState } from 'react';
import rootStore from 'store/RootStore/instance';

type ProductItem = {
  product: IngredientModel;
};

const ProductItem: FC<ProductItem> = ({ product }) => {
  const [value, setValue] = useState(0);

  const incrCount = () => {
    setValue((prev) => prev + 1);
  };

  const decrCount = () => {
    value > 0 && setValue((prev) => prev - 1);
  };

  const addIngredient = () => {
    if (value > 0) {
      const ingredient = {
        item: `${value} ${product.nameClean}`,
        aisle: product.aisle,
        parse: true,
      };
      rootStore.shoppingList.addToShoppingList(ingredient);
    }
  };

  return (
    <div className={s.product__wrap}>
      <img className={s.product__img} src={product.image} alt={product.nameClean} />
      <Text view="p-14">{product.nameClean}</Text>
      <Counter value={value} incr={incrCount} decr={decrCount} />
      <Button onClick={addIngredient} className={s.product__btn}>
        Buy
      </Button>
    </div>
  );
};

export default ProductItem;
