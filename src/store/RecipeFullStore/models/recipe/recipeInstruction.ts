import { StepApi, StepModel, normalizeStep } from './step';

export type RecipeInstructionApi = {
  steps: StepApi[];
};

export type RecipeInstructionModel = {
  steps: StepModel[];
};

export const normalizeRecipeInstruction = (from: RecipeInstructionApi): RecipeInstructionModel => {
  return {
    steps: from.steps.map(normalizeStep),
  };
};
