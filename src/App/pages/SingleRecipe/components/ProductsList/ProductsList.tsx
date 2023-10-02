import Text from 'components/Text';
import s from './ProductsList.module.scss';
import { IngredientModel } from 'entites/Ingredient';
import { FC, useMemo } from 'react';
import Button from 'components/Button';
import Counter from 'components/Counter';
import ProductItem from '../ProductItem';

type ProductListProps = {
  extendedIngredients: IngredientModel[];
};

const ProductsList: FC<ProductListProps> = ({extendedIngredients}) => {

  const products = useMemo(() => extendedIngredients.map((item) => ({...item, image: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`})).filter((item, i, arr) => (i === arr.findIndex((prod) => prod.id === item.id))), [extendedIngredients]);

  return (
    <div className={s.product}>
      <Text className={s['product__title']} weight="medium" view="p-20">
        Product List
      </Text>
      <div className={s.product__list}>
        {products.map((item) => {
          return (
           <ProductItem key={item.id} product={item} />
          )
        })}
      </div>
    </div>
  );
};

export default ProductsList;
