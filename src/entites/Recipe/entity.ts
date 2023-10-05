import { CaloryApi, CaloryModel } from 'entites/Calory';
import { IngredientApi, IngredientModel } from 'entites/Ingredient';
import { RecipeInstructionApi, RecipeInstructionModel } from 'entites/Instruction';

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
  servings: number
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
  servings: number
};

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

export type SimilarRecipeApi = {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
};

export type SimilarRecipeModel = string[];
