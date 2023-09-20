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
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: [];
};

export type Calory = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export type RecipeFull = {
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  extendedIngredients: Ingredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  image: string;
  summary: string;
  instructions: string;
  analyzedInstructions: RecipeInstruction[];
};

export type RecipeInstruction = {
  steps: Step[];
};

export type Step = {
  number: number;
  step: string;
  equipment: [
    {
      id: number;
      name: string;
      localizedName: string;
      image: string;
    },
  ];
};
