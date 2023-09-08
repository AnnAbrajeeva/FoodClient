export type Recipe = {
  cookingMinutes: number;
  readyInMinutes: number;
  id: number;
  title: string;
  image: string;
  nutrition: {
    nutrients: Calory[];
    ingredients: Ingredient[];
  };
};

export type Ingredient = {
  name: string;
};

export type Calory = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};
