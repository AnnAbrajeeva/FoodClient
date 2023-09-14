import { Recipe } from "utils/entityTypes";

export type GetRecipesParams = {
  offset: number;
  itemsPerPage: number;
  apiKey: string;
};

export type GetRecipesApiResponse = {
    number: number;
    offset: number;
    results: Recipe[],
    totalResults: number;
}

export interface IRecipeStore {
  getRecipesList(params: GetRecipesParams): Promise<void>;
}
