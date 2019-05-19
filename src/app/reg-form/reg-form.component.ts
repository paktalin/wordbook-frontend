import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.authService.logout();
  }

  register() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService.register(val.username, val.password)
        .subscribe(
          () => {

            this.router.navigate( ['/login']);
          },
          error => {
            if (error.status === 400) {
              this.alertService.setMessage(error.error.message);
            }
          }
        );
    }
  }


}
