import { RecipeFullApi } from 'entites/Recipe';

export type GetRecipeFullParams = {
  id: string | undefined;
};

export type GetRecipeFullApiData = {
  isError: boolean;
  data: RecipeFullApi;
};

export interface IRecipeStore {
  getRecipesList(params: GetRecipeFullParams): Promise<void>;
}
