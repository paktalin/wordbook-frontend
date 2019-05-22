import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from './User';
import {AlertService} from './alert/alert.service';
import {Router} from '@angular/router';
import {UserResponse} from './UserResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private alertService: AlertService,
              private router: Router) {
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string) {
    const user = new User(username, password);
    return this.http.post<UserResponse>('/api/login', user)
      .pipe(map(result => {
        if (result && result.token) {
          localStorage.setItem('access_token', result.token);
        }
      }));
  }

  register(username: string, password: string) {
    return this.http.post<UserResponse>('/api/register', {username, password});
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  coordinateError(error ) {
    if (error.status === 400) {
      this.logout();
      this.router.navigate(['/login']);
      this.alertService.error(error.error.message);
    }
    if (error.status === 500) {
      this.logout();
      this.router.navigate(['/login']);
      this.alertService.error('Service internal error, try again later');
    }
  }
}
