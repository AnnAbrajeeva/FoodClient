import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { API_KEY } from 'config/api/api';
import { RecipeApi, RecipeModel, normalizeRecipe } from 'entites/Recipe';
import { SimilarRecipeApi } from 'entites/Recipe/entity';
import { ILocalStore } from 'hooks/useLocalStore';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/common/collection';
import { fetchApi } from 'utils/apiResponse';
import { Meta } from 'utils/meta';
import { GetRecipesParams, SimilarRecipeParams } from './types';

type PrivateFields = '_list' | '_meta' | '_ids';

export default class SimilarRecipesStore implements ILocalStore {
  private _list: CollectionModel<number, RecipeModel> = getInitialCollectionModel();
  private _ids: string = '';
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<SimilarRecipesStore, PrivateFields>(this, {
      _list: observable.ref,
      _ids: observable,
      _meta: observable,
      list: computed,
      meta: computed,
      fetchSimilarIds: action,
    });
  }

  get list(): RecipeModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async fetchSimilarIds({ id }: GetRecipesParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const res = await fetchApi<SimilarRecipeApi[]>(`recipes/${id}/similar?apiKey=${API_KEY}&number=3`);

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            this._ids = res.data.map((item) => item.id).join(',');
            this._meta = Meta.success;
            this.fetchSimilarRecipes({ ids: this._ids });
            return;
          } catch (error) {
            this._meta = Meta.error;
            this._list = getInitialCollectionModel();
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      });
    }
  }

  async fetchSimilarRecipes({ ids }: SimilarRecipeParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const res = await fetchApi<RecipeApi[]>(
      `recipes/informationBulk?ids=${ids}&apiKey=${API_KEY}&includeNutrition=true`,
    );

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            const list = res.data.map((item) => normalizeRecipe(item));
            this._list = normalizeCollection(list, (listItem) => listItem.id);
            this._meta = Meta.success;
            return;
          } catch (error) {
            this._meta = Meta.error;
            this._list = getInitialCollectionModel();
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      });
    }
  }

  destroy(): void {}
}
