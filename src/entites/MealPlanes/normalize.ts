import { normalizeMealPlane } from 'entites/MealPlane/normalizer';
import { MealPlanesApi, MealPlanesModel } from './entity';

export const normalizeMealPlanes = (from: MealPlanesApi): MealPlanesModel => {
  return {
    meals: from.meals.map(normalizeMealPlane),
    nutrients: from.nutrients,
  };
};
