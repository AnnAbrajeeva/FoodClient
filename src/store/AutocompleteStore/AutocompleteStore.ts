import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { API_KEY } from 'config/api/api';
import { AutocompleteModel, normalizeAutocomlete } from 'entites/Autocomlete';
import { ILocalStore } from 'hooks/useLocalStore';
import { fetchApi } from 'utils/apiResponse';
import { Meta } from 'utils/meta';
import { AutocomleteApiData, AutocomleteParams } from './types';

type PrivateFields = '_list' | '_meta';

export default class AutocompleteStore implements ILocalStore {
  private _list: AutocompleteModel[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<AutocompleteStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      fetchAutocomplete: action,
    });
  }

  get list(): AutocompleteModel[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async fetchAutocomplete({ value }: AutocomleteParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = [];

    const res = await fetchApi<AutocomleteApiData>(`recipes/autocomplete?number=6&query=${value}&apiKey=${API_KEY}`);

    if (!res.isError) {
      runInAction(() => {
        if (res.data) {
          try {
            this._list = res.data.map((item) => normalizeAutocomlete(item));
            this._meta = Meta.success;
          } catch (error) {
            this._meta = Meta.error;
            this._list = [];
          }
        }
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
        this._list = [];
      });
    }
  }

  destroy(): void {}
}
