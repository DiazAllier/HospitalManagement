import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { modelDoctor } from '../models/doctor.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class DoctorService {
  url = (`${environment.url}`);
  urlHost = this.url + '/api/controller/doctor';



  constructor(private http: HttpClient) { }

  getDoctor(): Observable<any> {
    return this.http.get(this.urlHost, httpOptions);
  }

  deleteDoctor(id: any): Observable<any> {
    return this.http.delete(this.urlHost + '/' + id, httpOptions);
  }

  saveDoctor(doctor: modelDoctor): Observable<any> {
    return this.http.post(this.urlHost, doctor, httpOptions);
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.urlHost + '/' + id, httpOptions);
  }

  getDoctorByEmail(email: any): Observable<any> {
    return this.http.get(this.urlHost + "/email/" + email, httpOptions);
  }

  getDoctorPatients(id: any): Observable<any> {
    return this.http.get(this.urlHost + '/' + id + "/patients", httpOptions);
  }

  getDoctorSpecialization(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/specialization/" + id, httpOptions);
  }

  dischargePatient(idD: any, idP: any): Observable<any> {
    return this.http.delete(this.urlHost + '/' + idD + '/patients/' + idP, httpOptions);
  }

}