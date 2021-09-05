import { action, makeAutoObservable, observable } from 'mobx';
import { RootStoreModel } from '.';
import jwtDecode from 'jwt-decode';
import { getCookie } from '../helpers';
interface ITokenDecoded {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}
export interface IUserStore {
  id: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  avatar: string | null;
  isLoading: boolean;

  setIdAndToken: (token: string) => void;
  setDetails: () => Promise<void>;
  unsetUser: () => void;
}

export class UserStore implements IUserStore {
  private rootStore: RootStoreModel | undefined;
  private tokenExpiration: number;

  @observable id = null;
  @observable name = null;
  @observable email = null;
  @observable token = getCookie('jdiToken') || null;
  @observable avatar = null;
  @observable isLoading = false;

  constructor(rootStore?: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    if (this.token) this.setIdAndToken(this.token);
    if (this.isExpired) this.unsetUser();
  }

  set loading(value: boolean) {
    this.isLoading = value;
  }

  @action setIdAndToken = (token: string): void => {
    const { userId, exp } = jwtDecode<ITokenDecoded>(token);
    document.cookie = `jdiToken=${token};max-age=${24 * 3600}`;
    this._token = token;
    this._id = userId;
    this.tokenExpiration = exp;
  };

  @action setDetails = async (): Promise<void> => {
    this.loading = true;
    try {
      const res = await fetch(this.rootStore.apiUrl + '/users/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token },
      });
      const { name, email, avatar } = await res.json();
      this._name = name;
      this._email = email;
      this._avatar = avatar;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  };

  @action unsetUser = (): void => {
    document.cookie = `jdiToken=${this.token};max-age=0`;
    this._id = null;
    this._name = null;
    this._email = null;
    this._token = null;
    this._avatar = null;
  };

  get isExpired(): boolean {
    return this.tokenExpiration * 1000 < Date.now();
  }
  set _id(value: string) {
    this.id = value;
  }
  set _name(value: string) {
    this.name = value;
  }
  set _email(value: string) {
    this.email = value;
  }
  set _token(value: string) {
    this.token = value;
  }
  set _avatar(value: string) {
    this.avatar = value;
  }
}
