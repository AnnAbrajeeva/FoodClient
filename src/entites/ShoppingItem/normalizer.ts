import { ShoppingItemApi, ShoppingItemModel } from './entity';

export const normalizerShoppingItem = (from: ShoppingItemApi): ShoppingItemModel => {
  return {
    id: from.id,
    name: from.name,
    measures: {
      original: {
        amount: from.measures.original.amount,
        unit: from.measures.original.unit,
      },
      metric: {
        amount: from.measures.metric.amount,
        unit: from.measures.metric.unit,
      },
      us: {
        amount: from.measures.us.amount,
        unit: from.measures.us.unit,
      },
    },
    pantryItem: from.pantryItem,
    aisle: from.aisle,
    cost: from.cost,
    ingredientId: from.ingredientId,
  };
};
