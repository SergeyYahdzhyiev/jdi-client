import React, { createContext, FC, ReactElement, ReactNode } from 'react';
import { AlertStore } from './alert';
import { UserStore } from './user';

export interface RootStoreModel {
  userStore: UserStore;
  alertStore: AlertStore;
}

export class RootStore implements RootStoreModel {
  userStore: UserStore;
  alertStore: AlertStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.alertStore = new AlertStore(this);
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
