import { normalizeStep } from 'entites/Step';
import { RecipeInstructionApi, RecipeInstructionModel } from './entity';

export const normalizeRecipeInstruction = (from: RecipeInstructionApi): RecipeInstructionModel => {
  return {
    steps: from.steps.map(normalizeStep),
  };
};
