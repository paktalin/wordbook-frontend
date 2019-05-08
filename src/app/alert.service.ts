import { Injectable } from '@angular/core';
import {AlertComponent} from './alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertComponent: AlertComponent) { }

  setMessage(messageText: string) {
      this.alertComponent.message = messageText;
  }
}
