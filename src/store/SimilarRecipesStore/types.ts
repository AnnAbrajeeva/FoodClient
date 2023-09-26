import { RecipeApi } from 'entites/Recipe';
import { SimilarRecipeApi } from 'entites/Recipe/entity';

export type GetRecipesParams = {
  id: string | undefined;
};

export type SimilarRecipeParams = {
  ids: string;
};

export type GetSimilarRecipesApiResponse = {
  results: SimilarRecipeApi[];
};

export type GetRecipesApiResponse = {
  results: RecipeApi[];
};

export type GetSimilarApiData = {
  isError: boolean;
  data: SimilarRecipeApi[];
};

export type GetRecipeApiData = {
  isError: boolean;
  data: GetRecipesApiResponse[];
};

export interface IRecipeStore {
  getRecipesList(params: GetRecipesParams): Promise<void>;
}
