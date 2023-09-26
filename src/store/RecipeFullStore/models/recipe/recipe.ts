import { IngredientApi, IngredientModel, normalizeIngredient } from './ingredient';
import { RecipeInstructionApi, RecipeInstructionModel, normalizeRecipeInstruction } from './recipeInstruction';

export type RecipeFullApi = {
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  extendedIngredients: IngredientApi[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  image: string;
  summary: string;
  instructions: string;
  analyzedInstructions: RecipeInstructionApi[];
};

export type RecipeFullModel = {
  recipeParams: {
    Preparation: number;
    Cooking: number;
    Total: number;
    Ratings: number;
    Servings: number;
  };
  extendedIngredients: IngredientModel[];
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  analyzedInstructions: RecipeInstructionModel[];
};

export const normalizeRecipeFull = (from: RecipeFullApi): RecipeFullModel => {
  return {
    recipeParams: {
      Preparation: from.preparationMinutes,
      Cooking: from.cookingMinutes,
      Total: from.readyInMinutes,
      Ratings: from.aggregateLikes,
      Servings: from.servings,
    },

    extendedIngredients: from.extendedIngredients.map(normalizeIngredient),
    id: from.id,
    title: from.title,
    image: from.image,
    summary: from.summary,
    instructions: from.instructions,
    analyzedInstructions: from.analyzedInstructions.map(normalizeRecipeInstruction),
  };
};
