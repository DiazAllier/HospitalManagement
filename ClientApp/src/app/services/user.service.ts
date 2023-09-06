import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  url = (`${environment.url}`);
  urlHost = this.url + '/api/controller/users';


  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.urlHost, httpOptions);
  }

  getUsersRoles(): Observable<any> {
    return this.http.get(this.url + '/api/controller/roles', httpOptions);
  }

  sendEmail(email): Observable<any> {
    return this.http.post<any>(this.urlHost, email, httpOptions);
  }

  saveUser(user): Observable<any> {
    return this.http.post<any>(this.urlHost, user, httpOptions);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.urlHost + "/" + id, httpOptions);
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/" + id, httpOptions);
  }

  getByUsername(username: any): Observable<any> {
    return this.http.get(this.urlHost + "/find/" + username, httpOptions);
  }

}