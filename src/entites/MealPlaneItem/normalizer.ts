import { MealPlanItemApi, MealPlanItemModel } from "./entity";

export const normalizerMealPlaneItem = (from: MealPlanItemApi): MealPlanItemModel => {
    return {
        id: from.id,
        slot: from.slot,
        position: from.position,
        type: from.type,
        value: {
          servings: from.value.servings,
          id: from.value.id,
          title: from.value.title,
          imageType: from.value.imageType
        }
    }
}