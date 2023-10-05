import { MealPlaneDayApi, MealPlaneDayModel } from 'entites/MealPlaneDay';
import { MealPlanItemApi } from 'entites/MealPlaneItem';

export type MealPlaneApi = {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
};

export type MealPlaneModel = {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  img?: string;
};

export type UserMealPlanApi = {
  days: MealPlaneDayApi[];
};

export type UserMealPlanModel = {
  days: MealPlaneDayModel[];
};
