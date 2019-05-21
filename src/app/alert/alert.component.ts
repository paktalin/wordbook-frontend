import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from './alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  message: any;
  private subscription: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    console.log(this.alertService.getMessage());
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
