import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InvoicesServices } from '../../../services/invoice.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { StorageService } from '../../../services/storage.service';
import { Person } from '../../../models/person.model';
import { personService } from '../../../services/person.service';
import { PaymentService } from '../../../services/payment.service';
@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent {
  constructor(private invoiceService: InvoicesServices, private personService: personService, private paymentS: PaymentService,
    private title: Title, private _changeDetectorRef: ChangeDetectorRef, private router: Router, private storageService: StorageService) { }

  public searchText;
  public person: Person = new Person();
  public invoices: any = "";

  ngOnInit(): void {
    this.title.setTitle('Invoices');
    this.getInvoices()
  }

  getInvoices() {
    this.personService.getByEmail(this.storageService.currentUser.value.email).subscribe({
      next: data => {
        this.paymentS.person_id = data.id;
        this.invoiceService.getAllByPersonId(data.id).subscribe({
          next: invoices => {
            this.invoices = invoices;
            console.log(this.invoices.total)
            this.setPagination(invoices.invoices);
          }, error: error => {
            console.log(error);
          }
        })
      }
    })
  }


  payment() {
    this.paymentS.totalAmount = this.invoices.total;
    this.router.navigate(['payment']);
  }

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataObs$: Observable<any>;

  setPagination(list) {
    this.dataSource = new MatTableDataSource<any>(list);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs$ = this.dataSource.connect();
  }
}
