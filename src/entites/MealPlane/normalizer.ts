import { normalizeMealPlaneDay } from 'entites/MealPlaneDay';
import { MealPlaneApi, MealPlaneModel, UserMealPlanApi, UserMealPlanModel } from './entity';

export const normalizeMealPlane = (from: MealPlaneApi): MealPlaneModel => {
  return {
    id: from.id,
    title: from.title,
    imageType: from.imageType,
    readyInMinutes: from.readyInMinutes,
    servings: from.servings,
    sourceUrl: from.sourceUrl,
  };
};

export const normalizeUserMealPlane = (from: UserMealPlanApi): UserMealPlanModel => {
  return {
    days: from.days.map((day) => normalizeMealPlaneDay(day))
  };
};
