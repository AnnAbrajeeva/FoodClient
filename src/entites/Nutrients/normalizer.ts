import { NutrientsApi, NutrientsModel } from './entity';

export const normalizeNutrients = (from: NutrientsApi): NutrientsModel => {
  return {
    calories: from.calories,
    carbohydrates: from.carbohydrates,
    fat: from.fat,
    protein: from.protein,
  };
};
