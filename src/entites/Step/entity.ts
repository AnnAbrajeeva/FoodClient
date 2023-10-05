import { EquipmentApi, EquipmentModel } from 'entites/Equipment';

export type StepApi = {
  number: number;
  step: string;
  equipment: EquipmentApi[];
};

export type StepModel = {
  number: number;
  step: string;
  equipment: EquipmentModel[];
};
