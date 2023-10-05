import { IngredientModel } from './entity';

export const getProducts = (ingredients: IngredientModel[]) => {
  return ingredients.map((item) => item.name).join(' + ');
};
