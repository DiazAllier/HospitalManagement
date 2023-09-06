import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { modelUser } from '../models/user.model';
import { modelRegisterFind } from '../models/auth.model';


const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class authService {
  private isAuthenticateds: boolean = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(userData: modelUser): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username: userData.username,
        password: userData.password,
        email: userData.email,
        roles: userData.roles,
        person: userData.person
      }
    );
  }

  checkToken(token: string): Observable<any> {
    return this.http.post(AUTH_API + 'verify/' + token, {
    },
      httpOptions
    );
  }

  refreshToken(token: string) {
    return this.http.get(AUTH_API + 'refreshtoken/' + token, httpOptions);
  }

  changepassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {

    return this.http.post(
      AUTH_API + 'changepassword',
      {
        userId,
        oldPassword,
        newPassword
      },
      httpOptions
    );
  }

  registerFind(userData: modelRegisterFind): Observable<any> {
    return this.http.post(
      AUTH_API + 'register/person',
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
        dob: userData.dob,
      }
    );
  }

}