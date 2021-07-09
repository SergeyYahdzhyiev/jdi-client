import { makeAutoObservable, observable, action } from 'mobx';
import { RootStoreModel } from '.';
import { ILoginFormState } from '../components';

export interface IAuthStore {
  isFetching: boolean;
  login: (data: ILoginFormState) => Promise<void>;
}

export class AuthStore implements IAuthStore {
  private rootStore: RootStoreModel | undefined;
  private apiUrl = 'https://jdi-api.herokuapp.com';

  @observable isFetching: boolean;

  constructor(rootStore?: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    console.log(this.rootStore);
  }

  @action login = async (data: ILoginFormState): Promise<void> => {
    try {
      this.isFetching = true;
      const res = await fetch(this.apiUrl + '/auth/login', { method: 'POST', body: JSON.stringify(data) });
      const resData = await res.json();

      if (!res.ok) {
        this.rootStore.alertStore.showAlert(resData.error);
      } else {
        this.rootStore.userStore.setIdAndToken(resData);
      }

      this.isFetching = false;
    } catch (e) {
      this.isFetching = false;
      console.log(e);
    }
  };
}
