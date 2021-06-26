import { action, makeAutoObservable, observable } from 'mobx';
import { RootStoreModel } from '.';

type PayloadRecord<K extends keyof IUserStore, T> = Partial<Record<K, T>>;

export interface IUserStore {
  id: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  avatar: string | null;

  setIdAndToken: (payload: PayloadRecord<keyof IUserStore, string>) => void;
  setDetails: (payload: PayloadRecord<keyof IUserStore, string>) => void;
}

export class UserStore implements IUserStore {
  private rootStore: RootStoreModel | undefined;

  @observable id = null;
  @observable name = null;
  @observable email = null;
  @observable token = null;
  @observable avatar = null;
  constructor(rootStore?: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action setIdAndToken = (payload: PayloadRecord<keyof IUserStore, string>): void => {
    const { id, token } = payload;
    this.id = id;
    this.token = token;
    console.log(this.rootStore);
  };

  @action setDetails = (payload: PayloadRecord<keyof IUserStore, string>): void => {
    const { name, email, avatar } = payload;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  };
}
