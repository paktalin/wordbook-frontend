import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    return this.http.post<any>('/auth/login', {username, password})
      .pipe(map(result => {
        if (result && result.token) {
          localStorage.setItem('access_token', result.token);
        }
      }));
  }

  register(username: string, password: string) {
    // TODO Make a request to /auth/register endpoint
    this.http.post<any>('/auth/register', {username, password})
      .pipe(map(result => {
        if (result && result.token) {
          localStorage.setItem('access_token', result.token);
        }
      }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
