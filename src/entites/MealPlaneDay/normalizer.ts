import { normalizerMealPlaneItem } from 'entites/MealPlaneItem';
import { MealPlaneDayApi, MealPlaneDayModel } from './entity';

export const normalizeMealPlaneDay = (from: MealPlaneDayApi): MealPlaneDayModel => {
  return {
    nutritionSummary: {
      nutrients: from.nutritionSummary.nutrients,
    },
    nutritionSummaryBreakfast: {
      nutrients: from.nutritionSummaryBreakfast.nutrients,
    },
    nutritionSummaryLunch: {
      nutrients: from.nutritionSummaryLunch.nutrients,
    },
    nutritionSummaryDinner: {
      nutrients: from.nutritionSummaryDinner.nutrients,
    },
    date: from.date,
    day: from.day,
    items: from.items.map((item) => normalizerMealPlaneItem(item)),
  };
};
