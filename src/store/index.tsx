import React, { createContext, FC, ReactElement, ReactNode } from 'react';
import { AlertStore } from './alert';
import { AuthStore } from './auth';
import { UserStore } from './user';

export interface RootStoreModel {
  userStore: UserStore;
  alertStore: AlertStore;
  authStore: AuthStore;
}

export class RootStore implements RootStoreModel {
  userStore: UserStore;
  alertStore: AlertStore;
  authStore: AuthStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.alertStore = new AlertStore(this);
    this.authStore = new AuthStore(this);
  }
}

export const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

interface IStoreComponentProps {
  store: RootStoreModel;
  children: ReactNode;
}

export type StoreComponent = FC<IStoreComponentProps>;

export const StoreProvider: StoreComponent = ({ store, children }: IStoreComponentProps): ReactElement => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
