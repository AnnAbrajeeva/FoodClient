import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { API_KEY } from 'config/api/api';
import { RecipeModel, normalizeRecipe } from 'entites/Recipe';
import { ILocalStore } from 'hooks/useLocalStore';
import { GetRecipesApiResponse, GetRecipesParams } from 'store/RecipesStore/types';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/common/collection';
import { fetchApi } from 'utils/apiResponse';
import { Meta } from 'utils/meta';

type PrivateFields = '_list' | '_meta' | '_totalRecipe' | '_searchList';

export default class RecipesStore implements ILocalStore {
  private _list: CollectionModel<number, RecipeModel> = getInitialCollectionModel();
  private _totalRecipe = 0;
  private _meta: Meta = Meta.initial;
  private _limit: number = 9;
  private _searchList: CollectionModel<number, RecipeModel> = getInitialCollectionModel();

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _totalRecipe: observable,
      _searchList: observable,
      list: computed,
      meta: computed,
      totalRecipe: computed,
      searchList: computed,
      getRecipesList: action,
      pageCount: computed,
      fetchSearchList: action
    });
  }

  get list(): RecipeModel[] {
    return linearizeCollection(this._list);
  }

  get searchList(): RecipeModel[] {
    return linearizeCollection(this._searchList);
  }

  get meta(): Meta {
    return this._meta;
  }

  get totalRecipe(): number {
    return this._totalRecipe;
  }

  get pageCount() {
    return Math.ceil(this._totalRecipe / this._limit);
  }

  async getRecipesList({ offset, itemsPerPage, search, category }: GetRecipesParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const categories = category.map((item) => item.key).join(', ');

    const searchParams = search ? `&query=${search}` : '';
    const categoryDish = category.length > 0 ? `&type=${categories}` : '';

    const res = await fetchApi<GetRecipesApiResponse>(
      `recipes/complexSearch?apiKey=${API_KEY}&addRecipeNutrition=true&offset=${offset}&number=${itemsPerPage}&limitLicense=true${searchParams}${categoryDish}`,
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

  async fetchSearchList({ search }: GetRecipesParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const res = await fetchApi<GetRecipesApiResponse>(
      `recipes/complexSearch?apiKey=${API_KEY}&addRecipeNutrition=true&${search}`,
    );

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            const list: RecipeModel[] = [];
            for (const item of res.data.results) {
              list.push(normalizeRecipe(item));
            }
            this._searchList = normalizeCollection(list, (listItem) => listItem.id);
            this._meta = Meta.success;
            return;
          } catch (error) {
            this._meta = Meta.error;
            this._searchList = getInitialCollectionModel();
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
        this._searchList = getInitialCollectionModel();
      });
    }
  }

  destroy(): void {}
}
