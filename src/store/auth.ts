import { makeAutoObservable, observable, action } from 'mobx';
import { RootStoreModel } from '.';
import { ILoginFormState, IRegisterFormState } from '../components';

export interface IAuthStore {
  isFetching: boolean;
  error: boolean;
  login: (data: ILoginFormState) => Promise<void>;
  register: (data: IRegisterFormState) => Promise<void>;
}

export class AuthStore implements IAuthStore {
  private rootStore: RootStoreModel | undefined;

  @observable isFetching: boolean;
  @observable error: boolean;

  constructor(rootStore?: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.err = false;
  }

  set fetching(value: boolean) {
    this.isFetching = value;
  }

  set err(value: boolean) {
    this.error = value;
  }

  @action login = async (data: ILoginFormState): Promise<void> => {
    try {
      this.fetching = true;
      const res = await fetch(this.rootStore.apiUrl + '/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      const resData = await res.json();

      if (!res.ok) {
        this.err = true;
        this.rootStore.alertStore.showAlert(resData.error);
      } else {
        this.err = false;
        this.rootStore.userStore.setIdAndToken(resData.token);
      }

      this.fetching = false;
    } catch (e) {
      this.err = true;
      this.fetching = false;
      console.log(e);
    }
  };
  @action register = async (data: IRegisterFormState): Promise<void> => {
    try {
      this.fetching = true;
      const res = await fetch(this.rootStore.apiUrl + '/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      const resData = await res.json();

      if (!res.ok) {
        this.err = true;
        this.rootStore.alertStore.showAlert(resData.error);
      } else {
        this.err = false;
        this.rootStore.alertStore.showAlert(resData.message);
      }

      this.fetching = false;
    } catch (e) {
      this.err = true;
      this.fetching = false;
      console.log(e);
    }
  };
}
