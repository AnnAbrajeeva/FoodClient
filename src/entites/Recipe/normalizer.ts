import { normalizeCalory } from 'entites/Calory';
import { normalizeIngredient } from 'entites/Ingredient';
import { normalizeRecipeInstruction } from 'entites/Instruction';
import { RecipeApi, RecipeFullApi, RecipeFullModel, RecipeModel, SimilarRecipeApi, SimilarRecipeModel } from './entity';

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

export const normalizeSimilarRecipe = (from: SimilarRecipeApi[]): SimilarRecipeModel =>
  from.map((item) => String(item.id));
