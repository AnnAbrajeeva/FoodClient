import FavoriteRecipesStore from 'store/RootStore/FavoriteRecipesStore';
import QueryParamsStore from 'store/RootStore/QueryParamsStore';
import LocalStorageStore from './LocalStorageStore';
import UserStore from './UserStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly localStorage = new LocalStorageStore();
  readonly favoriteRecipesStore = new FavoriteRecipesStore(this.localStorage);
  readonly userStore = new UserStore();
}
