import { API_KEY } from 'config/api/api';
import { UserMealPlanApi, UserMealPlanModel } from 'entites/MealPlane';
import { MealPlaneDayModel } from 'entites/MealPlaneDay';
import { ILocalStore } from 'hooks/useLocalStore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import rootStore from 'store/RootStore';
import { DeleteApi, PostApi } from 'utils/apiResponse';
import { Meta } from 'utils/meta';
import { AddToMealPlanProps, days } from './types';
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import firestoreDatabase from 'utils/firebase';
import { MealDay } from 'src/App/pages/MealPlan/MealPlan';

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
      // fetchMealPlan: action,
      addToMealPlan: action,
      // deleteFromMealPlan: action,
    });
  }

  get list(): MealPlaneDayModel[] | null {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  // async fetchMealPlan(): Promise<void> {
  //   this._meta = Meta.loading;

  //   const qry = query(collection(firestoreDatabase, 'users'), where('login', '==', rootStore.userStore.user?.login));
  //   const querySnapshot = await getDocs(qry);

  //   if (querySnapshot.size > 0) {
  //     querySnapshot;
  //   }

  //   if (!res.isError) {
  //     runInAction(() => {
  //       if (res.data) {
  //         try {
  //           this._meta = Meta.success;
  //           this._list = res.data.days;
  //           return;
  //         } catch (error) {
  //           this._meta = Meta.error;
  //         }
  //       }
  //     });
  //   } else {
  //     runInAction(() => {
  //       this._meta = Meta.error;
  //     });
  //   }
  // }

  async addToMealPlan(boards: MealDay[]): Promise<void> {
    this._meta = Meta.loading;
  
    const userLogin = rootStore.userStore.user?.login;
    const collectionRef = collection(firestoreDatabase, 'users');
    const qry = query(collectionRef, where('login', '==', userLogin));
  
    const querySnapshot = await getDocs(qry);
  
    if (querySnapshot.size > 0) {
      const userDoc = querySnapshot.docs[0];
      
      const userData = userDoc.data();
      console.log(userData)
      console.log(boards)
  
      if (!userData.boards) {
        const userDocRef = doc(firestoreDatabase, 'users', userDoc.id);
        await setDoc(userDocRef, { boards: boards }, { merge: true });
        console.log(userData.boards)
      }
    }

    runInAction(() => {
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
    });
  }

  // async deleteFromMealPlan(id: number): Promise<void> {
  //   this._meta = Meta.loading;

  //   const res = await DeleteApi(
  //     `/mealplanner/${rootStore.userStore.user?.login}/items/${id}?hash=${rootStore.userStore.user?.hash}&apiKey=${API_KEY}`,
  //   );

  //   if (!res.isError) {
  //     runInAction(() => {
  //       if (res.data) {
  //         try {
  //           this._meta = Meta.success;
  //           return;
  //         } catch (error) {
  //           this._meta = Meta.error;
  //         }
  //       }
  //     });
  //   } else {
  //     runInAction(() => {
  //       this._meta = Meta.error;
  //     });
  //   }
  // }

  destroy(): void {}
}
