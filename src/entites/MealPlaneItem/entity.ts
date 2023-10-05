export type MealPlanItemApi = {
  id: number;
  slot: number;
  position: number;
  type: string;
  value: {
    servings: number;
    id: number;
    title: string;
    imageType: string;
  };
};

export type MealPlanItemModel = {
    id: number;
    slot: number;
    position: number;
    type: string;
    value: {
      servings: number;
      id: number;
      title: string;
      imageType: string;
    };
  };
