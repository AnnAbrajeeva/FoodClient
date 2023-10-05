export type AddToMealPlanProps = RecipeMealPlan | IngredientMealPlan;

export type RecipeMealPlan = {
  date: number;
  slot: number;
  position: number;
  type: string;
  value: {
    id: number;
    servings: number;
    title: string;
    imageType: string;
  };
};

export type IngredientMealPlan = {
  date: number;
  slot: number;
  position: number;
  type: string;
  value: {
    ingredients: [
      {
        name: string;
        unit: string;
        amount: string;
        image: string;
      },
    ];
  };
};

export const days = {
    'Monday': 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
    "Sunday": 7
}
