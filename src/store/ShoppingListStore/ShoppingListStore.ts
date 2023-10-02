import { Meta } from 'utils/meta';
import { ShoppingListModel } from 'entites/ShoppingList/entity';
import { ILocalStore } from 'hooks/useLocalStore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { DeleteApi, PostApi, fetchApi } from 'utils/apiResponse';
import { API_KEY } from 'config/api/api';
import rootStore from 'store/RootStore/instance';
import { AddToShoppingListProps } from './types';
import { ShoppingItemModel } from 'entites/ShoppingItem';

type PrivateFields = '_list' | '_meta';

export default class ShoppingListStore implements ILocalStore {
  private _list: ShoppingItemModel[] | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ShoppingListStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      generateShoppingList: action,
      addToShoppingList: action,
      getShoppingList: action,
      deleteFromShoppingList: action,
    });
  }

  get list(): ShoppingItemModel[] | null {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async generateShoppingList(): Promise<void> {
    this._meta = Meta.loading;

    const week = new Date();
    week.setDate(week.getDate() + 7);

    const startDate = new Date().toISOString().split('T')[0];
    const endDate = week.toISOString().split('T')[0];

    const res = await PostApi<ShoppingListModel>(
      `/mealplanner/${rootStore.userStore.user?.login}/shopping-list/${startDate}/${endDate}?hash=${rootStore.userStore.user?.hash}&apiKey=${API_KEY}`,
    );

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            console.log(res.data);
            this._meta = Meta.success;
            console.log(this._list);
            return;
          } catch (error) {
            this._meta = Meta.error;
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }

  async getShoppingList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = null;

    const res = await fetchApi<ShoppingListModel>(
      `/mealplanner/${rootStore.userStore.user?.login}/shopping-list/?hash=${rootStore.userStore.user?.hash}&apiKey=${API_KEY}`,
    );

    if (!res.isError) {
      runInAction(async () => {
        if (res.data) {
          try {
            const list = res.data.aisles.flatMap((aisle) => aisle.items);
            const ids = list.map((item) => item.ingredientId);
            const result = await Promise.all(ids.map((id) => this.getIngredient(id)));
            const idToImage: any = {};
            result.forEach((item: any) => {
              idToImage[item.id] = item.image;
            });
            const arr = list.map((item) => idToImage[item.ingredientId] ? {...item, img: `https://spoonacular.com/cdn/ingredients_100x100/${idToImage[item.ingredientId]}`} : item)

            this._meta = Meta.success;
            this._list = arr;
            return;
          } catch (error) {
            this._meta = Meta.error;
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }

  async addToShoppingList(product: AddToShoppingListProps): Promise<void> {
    this._meta = Meta.loading;

    const res = await PostApi<ShoppingListModel>(
      `/mealplanner/${rootStore.userStore.user?.login}/shopping-list/items?hash=${rootStore.userStore.user?.hash}&apiKey=${API_KEY}`,
      product,
    );

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            this._meta = Meta.success;
            return;
          } catch (error) {
            this._meta = Meta.error;
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }

  async deleteFromShoppingList(id: number): Promise<void> {
    this._meta = Meta.loading;

    const res = await DeleteApi<ShoppingListModel>(
      `/mealplanner/${rootStore.userStore.user?.login}/shopping-list/items/${id}?hash=${rootStore.userStore.user?.hash}&apiKey=${API_KEY}`,
    );

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            this._meta = Meta.success;
            return;
          } catch (error) {
            this._meta = Meta.error;
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }

  async getIngredient(id: number) {
    const res = await fetchApi(`/food/ingredients/${id}/information?amount=1&apiKey=${API_KEY}`);

    if (!res.isError) {
      return res.data;
    }
  }

  destroy(): void {}
}
