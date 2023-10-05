import { CaloryApi, CaloryModel } from './entity';

export const normalizeCalory = (from: CaloryApi): CaloryModel => {
  return {
    name: from.name,
    amount: from.amount,
    unit: from.unit,
    percentOfDailyNeeds: from.percentOfDailyNeeds,
  };
};
