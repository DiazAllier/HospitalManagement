import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { modelCountry } from '../models/country.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class CountryService {

  urlHost = "https://countriesnow.space/api/v0.1/countries";
  public country: modelCountry = new modelCountry();


  constructor(private http: HttpClient) { }

  getState(): Observable<any> {
    this.country.country = "United States";
    return this.http.post(this.urlHost + "/states", this.country, httpOptions);
  }

} 