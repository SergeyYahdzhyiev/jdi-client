import { makeAutoObservable, observable, action } from 'mobx';
import { RootStoreModel } from '.';
import { ILoginFormState, IRegisterFormState } from '../components';

export interface IAuthStore {
  isFetching: boolean;
  error: boolean;
  setError: (value: boolean) => void;
  setFetching: (vakue: boolean) => void;
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
    this.setError(false);
  }

  @action setFetching = (value: boolean): void => {
    this.isFetching = value;
  };

  @action setError = (value: boolean): void => {
    this.error = value;
  };

  @action login = async (data: ILoginFormState): Promise<void> => {
    try {
      this.setFetching(true);
      const res = await fetch(this.rootStore.apiUrl + '/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      const resData = await res.json();

      if (!res.ok) {
        this.setError(true);
        this.rootStore.alertStore.showAlert(resData.error);
      } else {
        this.setError(false);
        this.rootStore.userStore.setIdAndToken(resData.token);
      }

      this.setFetching(false);
    } catch (e) {
      this.setError(true);
      this.setFetching(false);
      console.log(e);
    }
  };
  @action register = async (data: IRegisterFormState): Promise<void> => {
    try {
      this.setFetching(true);
      const res = await fetch(this.rootStore.apiUrl + '/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      const resData = await res.json();

      if (!res.ok) {
        this.setError(true);
        this.rootStore.alertStore.showAlert(resData.error);
      } else {
        this.setError(false);
        this.rootStore.alertStore.showAlert(resData.message);
      }

      this.setFetching(false);
    } catch (e) {
      this.setError(true);
      this.setFetching(false);
      console.log(e);
    }
  };
}
