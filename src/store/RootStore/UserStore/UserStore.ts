import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { API_KEY } from 'config/api/api';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'hooks/useLocalStore';
import { UserLogin, UserRegister } from 'entites/User';
import firestoreDatabase from 'utils/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { api } from 'config/api/api';
import rootStore from '../instance';
import LocalStorageStore from '../LocalStorageStore';
import { tableData } from 'utils/tableData';

type PrivateFields = '_user' | '_meta';

export default class UserStore implements ILocalStore {
  private _user: UserRegister | null;
  private _meta: Meta = Meta.initial;

  constructor(localStorage: LocalStorageStore) {
    this._user = localStorage.getLocalItem('user')[0] || null;

    makeObservable<UserStore, PrivateFields>(this, {
      _user: observable,
      _meta: observable,
      createUser: action,
      loginUser: action,
      logout: action,
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  get user(): UserRegister | null {
    return this._user;
  }

  async createUser(user: UserRegister): Promise<void> {
    this._meta = Meta.loading;
    this._user = null;

    const qry = query(collection(firestoreDatabase, 'users'), where('login', '==', user.login));

    const querySnapshot = await getDocs(qry);

    if (querySnapshot.size > 0) {
      throw new Error('User already exist');
    }

    const res = await api.post(`/users/connect?apiKey=${API_KEY}`, {
      username: user.login,
      firstName: user.username,
      lastName: user.surname,
      email: user.email,
    });

    if (res.data) {
      runInAction(async () => {
        try {
          const newUser = { ...user, hash: res.data.hash, boards: [...tableData] };

          const docRef = collection(firestoreDatabase, 'users');
          await addDoc(docRef, newUser);
          rootStore.localStorage.removeItem('user');
          this.saveUserToLocal(newUser);
          runInAction(() => {
            this._user = newUser;
            this._meta = Meta.success;
          });
        } catch (error) {
          this._meta = Meta.error;
          this._user = null;
        }
      });
    } else {
      this._meta = Meta.error;
      this._user = null;
    }
  }

  async loginUser(user: UserLogin) {
    this._meta = Meta.loading;
    this._user = null;

    const qry = query(collection(firestoreDatabase, 'users'), where('login', '==', user.login));
    const querySnapshot = await getDocs(qry);

    runInAction(async () => {
      if (querySnapshot.size === 0) {
        this._meta = Meta.error;
        throw new Error('User does not exist');
      }

      const userData = querySnapshot.docs[0].data();

      if (userData.password !== user.password) {
        this._meta = Meta.error;
        throw new Error('Incorrect password');
      }

      this._user = userData as UserRegister;
      rootStore.localStorage.removeItem('user');
      this.saveUserToLocal(this._user);
      this._meta = Meta.success;
    });
  }

  logout = () => {
    runInAction(() => {
      this._user = null;
      rootStore.localStorage.removeItem('user');
    });
  };

  saveUserToLocal(user: UserLogin) {
    const userLocal = rootStore.localStorage.getLocalItem('user');
    if (!userLocal) {
      rootStore.localStorage.setLocalItem('user', user);
    }
  }

  destroy(): void {}
}
