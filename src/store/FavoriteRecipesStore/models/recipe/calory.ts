export type CaloryApi = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export type CaloryModel = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export const normalizeCalory = (from: CaloryApi): CaloryModel => {
  return {
    name: from.name,
    amount: from.amount,
    unit: from.unit,
    percentOfDailyNeeds: from.percentOfDailyNeeds,
  };
};
