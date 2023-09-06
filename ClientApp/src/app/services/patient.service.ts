import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Patients } from '../models/patient.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class patientService {
  url = (`${environment.url}`);
  urlHost = this.url + '/api/controller/patients';


  constructor(private http: HttpClient) { }

  getPatients(): Observable<any> {
    return this.http.get(this.urlHost, httpOptions);
  }

  deletePatients(id: any): Observable<any> {
    return this.http.delete(this.urlHost + '/' + id, httpOptions);
  }

  savePatients(patients: Patients): Observable<any> {
    return this.http.post(this.urlHost, patients, httpOptions);
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.urlHost + '/' + id, httpOptions);
  }

  getPatientByEmail(email: any): Observable<any> {
    return this.http.get(this.urlHost + "/email/" + email, httpOptions);
  }

  getPatientDoctor(id: any): Observable<any> {
    return this.http.get(this.urlHost + '/' + id + "/doctor", httpOptions);
  }

  assignDoctor(idP: any, idD: any): Observable<any> {
    return this.http.post(this.urlHost + '/' + idP + "/assign/" + idD, null, httpOptions);
  }
}
