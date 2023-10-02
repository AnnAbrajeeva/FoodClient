import { ShoppingItemApi, ShoppingItemModel } from "entites/ShoppingItem"

export type ShoppingAislesApi = {
    aisle: string;
    items: ShoppingItemApi[];
}

export type ShoppingAislesModel = {
    aisle: string;
    items: ShoppingItemApi[];
}