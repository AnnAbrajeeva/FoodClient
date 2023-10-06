import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { API_KEY } from 'config/api/api';
import { RecipeApi, RecipeModel, normalizeRecipe } from 'entites/Recipe';
import { ILocalStore } from 'hooks/useLocalStore';
import { GetFavoriteRecipesParams } from 'store/RecipesStore/types';
import rootStore from 'store/RootStore/instance';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/common/collection';
import { fetchApi } from 'utils/apiResponse';
import { Meta } from 'utils/meta';
import LocalStorageStore from '../LocalStorageStore';

type PrivateFields = '_list' | '_meta' | '_favoriteIds';

export default class FavoriteRecipesStore implements ILocalStore {
  private _list: CollectionModel<number, RecipeModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _favoriteIds: number[]

  constructor(localStorage: LocalStorageStore) {
    this._favoriteIds = localStorage.getLocalItem('recipes') || [];
    makeObservable<FavoriteRecipesStore, PrivateFields>(this, {
      _list: observable,
      _meta: observable,
      _favoriteIds: observable,
      list: computed,
      meta: computed,
      favoriteIds: computed,
      getFavoriteRecipesList: action,
      addToFavorite: action,
      removeFavorite: action,
    });
  }

  get list(): RecipeModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get favoriteIds(): number[] {
    return this._favoriteIds;
  }

  getFavoriteRecipesList = async ({ ids }: GetFavoriteRecipesParams): Promise<void> => {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const res = await fetchApi<RecipeApi[]>(
      `recipes/informationBulk?ids=${ids}&apiKey=${API_KEY}&includeNutrition=true`,
    );

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            const list = res.data.map(normalizeRecipe);
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
  };

  addToFavorite = (id: number) => {
    this._favoriteIds.push(id);
    rootStore.localStorage.setLocalItem('recipes', id);
  };

  removeFavorite = (id: number) => {
    this._favoriteIds = this._favoriteIds.filter((item) => item !== id);
    rootStore.localStorage.removeLocalItem('recipes', id);
  };

  isFavorite = (id: number) => this._favoriteIds.includes(id);

  destroy(): void {}
}
