import { EquipmentApi, EquipmentModel } from './entity';

export const normalizeEquipment = (from: EquipmentApi): EquipmentModel => {
  return {
    id: from.id,
    name: from.name,
    localizedName: from.localizedName,
    image: from.image,
  };
};
