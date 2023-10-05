import { IngredientApi, IngredientModel } from './entity';

export const normalizeIngredient = (from: IngredientApi): IngredientModel => {
  return {
    id: from.id,
    aisle: from.aisle,
    image: from.image,
    consistency: from.consistency,
    name: from.name,
    nameClean: from.nameClean,
    original: from.original,
    originalName: from.originalName,
    amount: from.amount,
    unit: from.unit,
    meta: from.meta,
  };
};
