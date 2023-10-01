import { MealPlaneApi, MealPlaneModel } from 'entites/MealPlane/entity';
import { NutrientsApi, NutrientsModel } from 'entites/Nutrients';

export type MealPlanesApi = {
  meals: MealPlaneApi[];
  nutrients: NutrientsApi;
};

export type MealPlanesModel = {
  meals: MealPlaneModel[];
  nutrients: NutrientsModel;
};
