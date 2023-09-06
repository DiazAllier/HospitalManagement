import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from '../models/person.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class personService {

  url = (`${environment.url}`);
  urlHost = this.url + '/api/controller/person';

  constructor(private http: HttpClient) { }

  getPerson(): Observable<any> {
    return this.http.get(this.urlHost, httpOptions);
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/" + id, httpOptions);
  }

  getByEmail(email: any): Observable<any> {
    return this.http.get(this.urlHost + "/e/" + email, httpOptions);
  }
  savePerson(person: Person): Observable<any> {
    return this.http.post<Person>(this.urlHost, person, httpOptions);
  }

}