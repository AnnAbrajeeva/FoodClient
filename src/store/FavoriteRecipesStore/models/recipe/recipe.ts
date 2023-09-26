import { CaloryApi, CaloryModel, normalizeCalory } from './calory';
import { IngredientApi, IngredientModel, normalizeIngredient } from './ingredient';

export type RecipeApi = {
  cookingMinutes: number;
  readyInMinutes: number;
  id: number;
  title: string;
  image: string;
  nutrition: {
    nutrients: CaloryApi[];
    ingredients: IngredientApi[];
  };
};

export type RecipeModel = {
  cookingMinutes: number;
  readyInMinutes: number;
  id: number;
  title: string;
  image: string;
  nutrition: {
    nutrients: CaloryModel[];
    ingredients: IngredientModel[];
  };
};

export const normalizeRecipe = (from: RecipeApi): RecipeModel => {
  return {
    cookingMinutes: from.cookingMinutes,
    readyInMinutes: from.readyInMinutes,
    id: from.id,
    title: from.title,
    image: from.image,
    nutrition: {
      nutrients: from.nutrition.nutrients.map(normalizeCalory),
      ingredients: from.nutrition.ingredients.map(normalizeIngredient),
    },
  };
};
