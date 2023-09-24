import { AutocompleteApi, AutocompleteModel } from "./entity";

export const normalizeAutocomlete = (from: AutocompleteApi): AutocompleteModel => {
    return {
        id: from.id,
        title: from.title,
        imageType: from.imageType
    };
  };