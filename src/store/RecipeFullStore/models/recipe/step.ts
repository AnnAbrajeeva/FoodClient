import { normalizeEquipment, EquipmentModel, EquipmentApi} from "./equipment";

export type StepApi = {
  number: number;
  step: string;
  equipment: EquipmentApi[]
};

export type StepModel = {
  number: number;
  step: string;
  equipment: EquipmentModel[]
};

export const normalizeStep = (from: StepApi): StepModel => {
    return {
     number: from.number,
     step: from.step,
     equipment: from.equipment.map(normalizeEquipment)
    };
  };
