import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = (`${environment.url}`);
  urlHost = this.url + '/api/controller/invoices';
  totalAmount = 0;
  person_id = "";
  transactionID = "";

  constructor(private http: HttpClient) { }

  success(request: any): Observable<any> {
    return this.http.post(this.urlHost + "/success", request, httpOptions);
  }

}