import { MealPlaneApi, MealPlaneModel } from './entity';

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
