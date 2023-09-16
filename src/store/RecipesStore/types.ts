import { RecipeApi } from "store/RecipesStore/models/recipe";

export type GetRecipesParams = {
  offset: number;
  itemsPerPage: number;
  apiKey: string;
  search: string;
};

export type GetRecipesApiResponse = {
    number: number;
    offset: number;
    results: RecipeApi[],
    totalResults: number;
}

export type GetRecipeApiData = {
    isError: boolean;
    data: GetRecipesApiResponse;
}

export interface IRecipeStore {
  getRecipesList(params: GetRecipesParams): Promise<void>;
}
