import { action, makeAutoObservable, observable } from 'mobx';

export interface IAlertStore {
  isShowing: boolean;
  message: string;

  showAlert: (message: string) => void;
  hideAlert: () => void;
}
export class AlertStore implements IAlertStore {
  @observable isShowing = false;
  @observable message = 'Default Alert Message!';

  constructor() {
    makeAutoObservable(this);
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
