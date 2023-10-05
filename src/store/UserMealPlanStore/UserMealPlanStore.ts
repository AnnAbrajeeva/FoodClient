import { API_KEY } from "config/api/api";
import { UserMealPlanApi, UserMealPlanModel } from "entites/MealPlane";
import { MealPlaneDayModel } from "entites/MealPlaneDay";
import { ILocalStore } from "hooks/useLocalStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import rootStore from "store/RootStore";
import { DeleteApi, PostApi } from "utils/apiResponse";
import { Meta } from "utils/meta";
import { AddToMealPlanProps, days } from "./types";


type PrivateFields = '_list' | '_meta';

export default class UserMealPlanStore implements ILocalStore {
  private _list: MealPlaneDayModel[] | never[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<UserMealPlanStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      fetchMealPlan: action,
      addToMealPlan: action,
      deleteFromMealPlan: action
    });
  }

  get list(): MealPlaneDayModel[] | null {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async fetchMealPlan(date: number): Promise<void> {
    this._meta = Meta.loading;

    const week = new Date(date);
    const newDate = week.toISOString().split('T')[0];

    const res = await PostApi<UserMealPlanApi>(
      `/mealplanner/${rootStore.userStore.user?.login}/week/${newDate}/?hash=${rootStore.userStore.user?.hash}&apiKey=${API_KEY}`,
    );

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            this._meta = Meta.success;
            this._list = res.data.days;
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

  async addToMealPlan(product: AddToMealPlanProps): Promise<void> {
    this._meta = Meta.loading;

    const res = await PostApi(
      `/mealplanner/${rootStore.userStore.user?.login}/items?hash=${rootStore.userStore.user?.hash}&apiKey=${API_KEY}`,
      product,
    );

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            runInAction(async () => {
              this._meta = Meta.success;
            });
            return;
          } catch (error) {
            runInAction(() => {
              this._meta = Meta.error;
            });
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }

  async deleteFromMealPlan(id: number): Promise<void> {
    this._meta = Meta.loading;

    const res = await DeleteApi(
      `/mealplanner/${rootStore.userStore.user?.login}/items/${id}?hash=${rootStore.userStore.user?.hash}&apiKey=${API_KEY}`,
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

  destroy(): void {}
}
