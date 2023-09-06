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

export class InvoicesServices {
  url = (`${environment.url}`);
  urlHost = this.url + '/api/controller/invoices';


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.urlHost, httpOptions);
  }

  getAllByPersonId(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/person/" + id, httpOptions);
  }
  getById(id: any): Observable<any> {
    return this.http.get(this.urlHost + "/" + id, httpOptions);
  }
  getByInvoiceN(number: any): Observable<any> {
    return this.http.get(this.urlHost + "/" + number, httpOptions);
  }
  save(invoice: any): Observable<any> {
    return this.http.post<any>(this.urlHost, invoice, httpOptions);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(this.urlHost + "/" + id, httpOptions);
  }

}