import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { RecipeModel, normalizeRecipe } from 'store/RecipesStore/models/recipe';
import { GetRecipesApiResponse, GetRecipesParams } from 'store/RecipesStore/types';
import { fetchApi } from 'utils/apiResponse';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'hooks/useLocalStore';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from './models/shared/collection';
import { API_KEY } from 'config/api/api';

type PrivateFields = '_list' | '_meta' | '_totalRecipe';

export default class RecipesStore implements ILocalStore {
  private _list: CollectionModel<number, RecipeModel> = getInitialCollectionModel();
  private _totalRecipe = 0;
  private _meta: Meta = Meta.initial;
  private _limit: number = 9;

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _totalRecipe: observable,
      list: computed,
      meta: computed,
      totalRecipe: computed,
      getRecipesList: action,
      pageCount: computed
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

  get pageCount() {
    return Math.ceil(this._totalRecipe / this._limit);
  };

  async getRecipesList({ offset, itemsPerPage, search, category }: GetRecipesParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const categories = category.map((item) => item.key).join(', ');

    const searchParams = search ? `&query=${search}` : '';
    const categoryDish = category.length > 0 ? `&type=${categories}` : '';

    const res = await fetchApi<GetRecipesApiResponse>(
      `recipes/complexSearch?apiKey=${API_KEY}&addRecipeNutrition=true&offset=${offset}&number=${itemsPerPage}&limitLicense=true${searchParams}${categoryDish}`
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
