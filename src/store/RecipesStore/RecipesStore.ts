import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { api } from 'config/api/api';
import { GetRecipesApiResponse, GetRecipesParams } from 'store/RecipesStore/types';
import { Recipe } from 'utils/entityTypes';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_list' | '_meta' | '_totalRecipe';

export default class RecipesStore implements ILocalStore {
  private _list: Recipe[] = [];
  private _totalRecipe = 0;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _totalRecipe: observable,
      list: computed,
      meta: computed,
      totalRecipe: computed,
      getRecipesList: action,
    });
  }

  get list(): Recipe[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get totalRecipe(): number {
    return this._totalRecipe;
  }

  async getRecipesList(params: GetRecipesParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = [];

    const res = await api.get<GetRecipesApiResponse>(
      `recipes/complexSearch?apiKey=${params.apiKey}&addRecipeNutrition=true&offset=${params.offset}&number=${params.itemsPerPage}&limitLicense=true`,
    );

    runInAction(() => {
      if (res && res.status === 200) {
        this._meta = Meta.success;
        this._list = res.data.results;
        this._totalRecipe = res.data.totalResults;
        return;
      }

      this._meta = Meta.error;
    });
  }

  destroy(): void {}
}
