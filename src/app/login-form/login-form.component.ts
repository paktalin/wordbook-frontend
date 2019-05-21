import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AlertService} from '../alert/alert.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

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
  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
        .subscribe(
          result => {
            console.log('response:' + result);
            console.log(localStorage.getItem('access_token'));
            // TODO whatever we need to do with the response
            this.router.navigate( ['/words']);
            this.alertService.success('Welcome back ' + val.username);
          },
          error => {
            if (error.status === 400) {
              console.log(error.error);
              this.alertService.error(error.error.message);
            }
            if (error.status === 504) {
               this.alertService.error('Service not respond');
            }
          }
        );
    }
  }
}
