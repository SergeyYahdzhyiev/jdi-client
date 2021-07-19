import { action, makeAutoObservable, observable } from 'mobx';
import { RootStoreModel } from '.';

export interface IAlertStore {
  isShowing: boolean;
  message: string;

  showAlert: (message: string) => void;
  hideAlert: () => void;
}
export class AlertStore implements IAlertStore {
  private rootStore: RootStoreModel | undefined;

  @observable isShowing = false;
  @observable message = 'Default Alert Message!';

  constructor(rootStore?: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    console.log(this.rootStore);
  }

  @action showAlert = (message: string): void => {
    this.isShowing = true;
    this.message = message;

    setTimeout(() => this.hideAlert(), 3000);
  };

  @action hideAlert = (): void => {
    this.isShowing = false;
  };
}
