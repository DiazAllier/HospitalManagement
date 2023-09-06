import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Notes } from '../models/note.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class NotesServices {

  url = (`${environment.url}`);
  urlHost = this.url + '/api/controller/notes';


  constructor(private http: HttpClient) { }

  getNotes(): Observable<any> {
    return this.http.get(this.urlHost, httpOptions);
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/" + id, httpOptions);
  }

  createNote(notes: Notes): Observable<any> {
    return this.http.post<any>(this.urlHost, notes, httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.urlHost + "/" + id, httpOptions);
  }


  findByDoctorId(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/doctor/" + id, httpOptions);
  }

  findByPatientId(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/patient/" + id, httpOptions);
  }


}