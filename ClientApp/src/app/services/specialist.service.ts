import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { modelSpecialist } from '../models/specialist.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class specialistService {
  url = (`${environment.url}`);
  urlHost = this.url + '/api/controller/specialists';

  constructor(private http: HttpClient) { }

  getSpecialist(): Observable<any> {
    return this.http.get(this.urlHost, httpOptions);
  }

  deleteSpecialist(id: any): Observable<any> {
    return this.http.delete(this.urlHost + "/" + id, httpOptions);
  }

  saveSpecialist(specialist: modelSpecialist): Observable<any> {
    return this.http.post<modelSpecialist>(this.url, specialist, httpOptions);
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/" + id, httpOptions);
  }


}