import { ShoppingAislesApi } from "entites/ShoppingAisles";

export type ShoppingListApi = {
  aisles: ShoppingAislesApi[]
  cost: number;
  startDate: number;
  endDate: number;
};

export type ShoppingListModel = {
    aisles: ShoppingAislesApi[]
    cost: number;
    startDate: number;
    endDate: number;
  };
