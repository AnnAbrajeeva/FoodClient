import { MealPlanItemApi } from "entites/MealPlaneItem";

export type MealPlaneDayApi = {
  nutritionSummary: {
    nutrients: [];
  };
  nutritionSummaryBreakfast: {
    nutrients: [];
  };
  nutritionSummaryLunch: {
    nutrients: [];
  };
  nutritionSummaryDinner: {
    nutrients: [];
  };
  date: number;
  day: string;
  items: MealPlanItemApi[];
};

export type MealPlaneDayModel = {
    nutritionSummary: {
      nutrients: [];
    };
    nutritionSummaryBreakfast: {
      nutrients: [];
    };
    nutritionSummaryLunch: {
      nutrients: [];
    };
    nutritionSummaryDinner: {
      nutrients: [];
    };
    date: number;
    day: string;
    items: MealPlanItemApi[];
  };
