export type ShoppingItemApi = {
  id: number;
  name: string;
  measures: {
    original: {
      amount: number;
      unit: string;
    };
    metric: {
      amount: number;
      unit: string;
    };
    us: {
      amount: number;
      unit: string;
    };
  };
  pantryItem: boolean;
  aisle: string;
  cost: number;
  ingredientId: number;
  img?: string;
};

export type ShoppingItemModel = {
    id: number;
    name: string;
    measures: {
      original: {
        amount: number;
        unit: string;
      };
      metric: {
        amount: number;
        unit: string;
      };
      us: {
        amount: number;
        unit: string;
      };
    };
    pantryItem: boolean;
    aisle: string;
    cost: number;
    ingredientId: number;
    img?: string
  };