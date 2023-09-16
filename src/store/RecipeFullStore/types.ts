import { RecipeFullApi } from "./models/recipe/recipe";

export type GetRecipeFullParams = {
    id: string | undefined;
    apiKey: string;
  };
  
  
  export type GetRecipeFullApiData = {
      isError: boolean;
      data: RecipeFullApi;
  }
  
  export interface IRecipeStore {
    getRecipesList(params: GetRecipeFullParams): Promise<void>;
  }