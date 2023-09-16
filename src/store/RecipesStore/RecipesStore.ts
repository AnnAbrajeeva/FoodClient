import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { RecipeModel, normalizeRecipe } from 'store/RecipesStore/models/recipe';
import { GetRecipesApiResponse, GetRecipesParams } from 'store/RecipesStore/types';
import { fetchApi } from 'utils/apiResponse';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from './models/shared/collection';

type PrivateFields = '_list' | '_meta' | '_totalRecipe';

export default class RecipesStore implements ILocalStore {
  private _list: CollectionModel<number, RecipeModel> = getInitialCollectionModel();
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

  get list(): RecipeModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get totalRecipe(): number {
    return this._totalRecipe;
  }

  async getRecipesList({apiKey, offset, itemsPerPage, search}: GetRecipesParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const searchParams = search ? `&query=${search}` : "";

    const res = await fetchApi<GetRecipesApiResponse>(
      `recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&offset=${offset}&number=${itemsPerPage}&limitLicense=true${searchParams}`,
    );

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            const list: RecipeModel[] = [];
            for (const item of res.data.results) {
              list.push(normalizeRecipe(item));
            }
            this._list = normalizeCollection(list, (listItem) => listItem.id);
            this._totalRecipe = res.data.totalResults;
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
