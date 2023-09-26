export type EquipmentApi = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type EquipmentModel = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export const normalizeEquipment = (from: EquipmentApi): EquipmentModel => {
  return {
    id: from.id,
    name: from.name,
    localizedName: from.localizedName,
    image: from.image,
  };
};
