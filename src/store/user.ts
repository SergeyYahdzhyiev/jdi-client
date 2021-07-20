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

  setLoading: (value: boolean) => void;
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
    console.log(this.rootStore);

    if (this.token) this.setIdAndToken(this.token);
    if (this.isExpired) this.unsetUser();
  }

  @action setLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  @action setIdAndToken = (token: string): void => {
    const { userId, exp } = jwtDecode<ITokenDecoded>(token);
    document.cookie = `jdiToken=${token};max-age=${24 * 3600}`;
    this.token = token;
    this.id = userId;
    this.tokenExpiration = exp;
  };

  @action setDetails = async (): Promise<void> => {
    this.setLoading(true);
    try {
      const res = await fetch(this.rootStore.apiUrl + '/users/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token },
      });
      const { name, email, avatar } = await res.json();
      this.name = name;
      this.email = email;
      this.avatar = avatar;
      this.setLoading(false);
    } catch (e) {
      this.setLoading(false);
      console.error(e);
    }
  };

  @action unsetUser = (): void => {
    document.cookie = `jdiToken=${this.token};max-age=0`;
    this.id = null;
    this.name = null;
    this.email = null;
    this.token = null;
    this.avatar = null;
  };

  get isExpired(): boolean {
    return this.tokenExpiration * 1000 < Date.now();
  }
}
