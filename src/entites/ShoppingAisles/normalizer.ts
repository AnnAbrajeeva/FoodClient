import { normalizerShoppingItem } from 'entites/ShoppingItem';
import { ShoppingAislesApi, ShoppingAislesModel } from './entity';

export const normalizerShoppingAisles = (from: ShoppingAislesApi): ShoppingAislesModel => {
  return {
    aisle: from.aisle,
    items: from.items.map((item) => normalizerShoppingItem(item))
  };
};
