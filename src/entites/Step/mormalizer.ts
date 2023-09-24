import { normalizeEquipment } from 'entites/Equipment';
import { StepApi, StepModel } from './entity';

export const normalizeStep = (from: StepApi): StepModel => {
  return {
    number: from.number,
    step: from.step,
    equipment: from.equipment.map(normalizeEquipment),
  };
};
