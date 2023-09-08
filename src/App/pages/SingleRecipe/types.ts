import { Ingredient } from "../HomePage/types";

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
  analyzedInstructions: RecipeInstra[];
};

type RecipeInstra = {
  steps: Step[];
};

type Step = {
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
