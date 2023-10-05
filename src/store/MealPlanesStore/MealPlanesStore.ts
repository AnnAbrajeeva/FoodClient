import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { API_KEY, api } from 'config/api/api';
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
import { MealPlanPerDayParams, MealPlanesImgProps } from './types';
import { MealPlanesApi, MealPlanesModel } from 'entites/MealPlanes';

type PrivateFields = '_list' | '_meta';

export default class MealPlanesStore implements ILocalStore {
  private _list: MealPlanesModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<MealPlanesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      fetchMealPlane: action,
    });
  }

  get list(): MealPlanesModel | null {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async fetchMealPlane({ diet, calory }: MealPlanPerDayParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = null;

    const res = await fetchApi<MealPlanesApi>(
      `/mealplanner/generate?timeFrame=day&targetCalories=${calory}&diet=${diet}&apiKey=${API_KEY}`,
    );

    // const newRes = await api.post(`/mealplanner/anuta04/shopping-list/items?hash=003600e79a156570b3c1d91c1a5dcddb74ffb540&apiKey=${API_KEY}`, {"item": "potato",
    // "parse": true})

    // console.log(newRes)

    if (!res.isError) {
      runInAction(async () => {
        if (res.data) {
          try {
            this._list = res.data;
            this._list.meals = this._list.meals.map((item) => ({ ...item, img: `https://spoonacular.com/recipeImages/${item.id}-480x360.${item.imageType}` }));
            this._meta = Meta.success;
            return;
          } catch (error) {
            this._meta = Meta.error;
            this._list = null;
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
        this._list = null;
      });
    }
  }

  destroy(): void {}
}
