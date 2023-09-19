import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { API_KEY } from 'config/api/api';
import { RecipeApi, RecipeModel, normalizeRecipe } from 'store/RecipesStore/models/recipe';
import { GetFavoriteRecipesParams } from 'store/RecipesStore/types';
import { fetchApi } from 'utils/apiResponse';
import { getLocalItem, removeLocalItem, setLocalItem } from 'utils/localStorage';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from './models/shared/collection';

type PrivateFields = '_list' | '_meta' | '_favoriteIds';

export default class FavoriteRecipesStore implements ILocalStore {
  private _list: CollectionModel<number, RecipeModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _favoriteIds: number[] = getLocalItem('recipes') || [];

  constructor() {
    makeObservable<FavoriteRecipesStore, PrivateFields>(this, {
      _list: observable.ref,
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

  async getFavoriteRecipesList({ apiKey, ids }: GetFavoriteRecipesParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const res = await fetchApi<RecipeApi[]>(
      `recipes/informationBulk?ids=${ids}&apiKey=${apiKey}&includeNutrition=true`,
    );

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            const list: RecipeModel[] = [];
            for (const item of res.data) {
              list.push(normalizeRecipe(item));
            }
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

  addToFavorite = (id: number) => {
    this._favoriteIds.push(id);
    setLocalItem('recipes', id);
  };

  removeFavorite = (id: number) => {
    this._favoriteIds = this._favoriteIds.filter((item) => item !== id);
    removeLocalItem('recipes', id);
  };

  isFavorite = (id: number) => {
    if (this._favoriteIds.length > 0) {
      return this._favoriteIds.includes(id);
    }
    return false;
  };

  destroy(): void {
    this._changeIdsReaction();
  }

  private readonly _changeIdsReaction: IReactionDisposer = reaction(
    () => this._favoriteIds,
    (ids) => {
      this.getFavoriteRecipesList({ ids: ids.join(','), apiKey: API_KEY });
    },
  );
}
