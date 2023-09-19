export type IngredientApi = {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: [];
};

export type IngredientModel = {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: [];
};

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
