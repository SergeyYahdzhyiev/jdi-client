import { action, makeAutoObservable, observable } from 'mobx';
import { RootStoreModel } from '.';
import jwtDecode from 'jwt-decode';
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
  @observable token = null;
  @observable avatar = null;

  constructor(rootStore?: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    console.log(this.rootStore);
  }

  @action setIdAndToken = (token: string): void => {
    const { userId, exp } = jwtDecode<ITokenDecoded>(token);
    this.token = token;
    this.id = userId;
    this.tokenExpiration = exp;
  };

  @action setDetails = async (): Promise<void> => {
    try {
      console.log(this.token);
      const res = await fetch(this.rootStore.apiUrl + '/users/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token },
      });
      const { name, email, avatar } = await res.json();
      this.name = name;
      this.email = email;
      this.avatar = avatar;
    } catch (e) {
      console.error(e);
    }
  };

  @action unsetUser = (): void => {
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
