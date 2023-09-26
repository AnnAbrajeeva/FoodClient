import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { fetchApi } from 'utils/apiResponse';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';
import { RecipeFullApi, RecipeFullModel, normalizeRecipeFull } from './models/recipe/recipe';
import { GetRecipeFullParams } from './types';

type PrivateFields = '_recipe' | '_meta';

export default class RecipeFullStore implements ILocalStore {
  private _recipe: RecipeFullModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RecipeFullStore, PrivateFields>(this, {
      _recipe: observable,
      _meta: observable,
      recipe: computed,
      meta: computed,
      getRecipe: action,
    });
  }

  get recipe(): RecipeFullModel | null {
    return this._recipe;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRecipe({ id, apiKey }: GetRecipeFullParams): Promise<void> {
    this._meta = Meta.loading;
    this._recipe = null;

    const res = await fetchApi<RecipeFullApi>(`recipes/${id}/information?apiKey=${apiKey}`);

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            this._recipe = normalizeRecipeFull(res.data);
            this._meta = Meta.success;
          } catch (error) {
            this._meta = Meta.error;
            this._recipe = null;
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
        this._recipe = null;
      });
    }
  }

  destroy(): void {}
}
