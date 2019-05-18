import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService) {
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string) {
    const user = new User(username, password);
    return this.http.post<any>('/api/login', user)
      .pipe(map(result => {
        if (result && result.token) {
          localStorage.setItem('access_token', result.token);
        }
      }));
  }

  register(username: string, password: string) {
    // TODO show alert message with an error
    return this.http.post<any>('/api/register', {username, password});
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
