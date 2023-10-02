import { normalizerShoppingAisles } from 'entites/ShoppingAisles';
import { ShoppingListApi, ShoppingListModel } from './entity';

export const normalizerShoppingList = (from: ShoppingListApi): ShoppingListModel => {
  return {
    aisles: from.aisles.map((item) => normalizerShoppingAisles(item)),
    cost: from.cost,
    startDate: from.startDate,
    endDate: from.endDate,
  };
};
