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

type PrivateFields = '_meta' | '_searchList';

export default class SearchRecipesStore implements ILocalStore {
  private _meta: Meta = Meta.initial;
  private _searchList: CollectionModel<number, RecipeModel> = getInitialCollectionModel();

  constructor() {
    makeObservable<SearchRecipesStore, PrivateFields>(this, {
      _meta: observable,
      _searchList: observable.ref,
      meta: computed,
      searchList: computed,
      fetchSearchList: action,
    });
  }

  get searchList(): RecipeModel[] {
    return linearizeCollection(this._searchList);
  }

  get meta(): Meta {
    return this._meta;
  }

  async fetchSearchList(search: string): Promise<void> {
    this._meta = Meta.loading;
    this._searchList = getInitialCollectionModel();

    const res = await fetchApi<GetRecipesApiResponse>(
      `recipes/complexSearch?query=${search}&apiKey=${API_KEY}&addRecipeNutrition=true`,
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
