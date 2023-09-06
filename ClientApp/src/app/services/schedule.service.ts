import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { modelSchedule } from '../models/schedule.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class scheduleService {
  url = (`${environment.url}`);
  urlHost = this.url + '/api/controller/appointment';



  constructor(private http: HttpClient) { }

  appointment(schedule: modelSchedule): Observable<any> {
    return this.http.post(this.urlHost, schedule, httpOptions);
  }

  setStatus(schedule: modelSchedule): Observable<any> {
    return this.http.put(this.urlHost + "/" + schedule.id, schedule, httpOptions);
  }
  getAppointmentsByDoctor(status: any, id: any): Observable<any> {
    return this.http.get(this.urlHost + "/doctor/" + status + "/" + id, httpOptions);
  }
  getAppointmentsByPatient(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/patient/" + id, httpOptions);
  }
}