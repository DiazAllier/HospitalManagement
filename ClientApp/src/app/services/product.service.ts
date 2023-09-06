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

export class ProductServices {

  url = (`${environment.url}`);
  urlHost = this.url + '/api/controller/product';

  product;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.urlHost, httpOptions);
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/" + id, httpOptions);
  }
  getByCode(code: any): Observable<any> {
    return this.http.get(this.urlHost + "/" + code, httpOptions);
  }
  save(product: any): Observable<any> {
    return this.http.post<any>(this.urlHost, product, httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.urlHost + "/" + id, httpOptions);
  }

}