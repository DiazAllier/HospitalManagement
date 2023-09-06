import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { personService } from '../../../services/person.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AppComponent } from '../../../app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listpersonas',
  templateUrl: './list-person.html',
  styleUrls: ['./css/list-person.css']
})

export class personListComponent implements OnInit {
  constructor(private _personService: personService, private router: Router,
    private title: Title, private _changeDetectorRef: ChangeDetectorRef, private app: AppComponent) { }


  //  VARIABLES
  public listPerson: any = [];
  searchText;
  //  FIN VARIABLES

  ngOnInit(): void {
    this.title.setTitle('list Personas');
    this.getPerson();
  }

  getPerson() {
    this._personService.getPerson().subscribe({
      next: data => {
        this.listPerson = data;
        this.setPagination(this.listPerson);
      }, error: error => {
        console.log(error);
      }
    })
  }

  deletePerson(person: any): void {
    Swal.fire({
      title: 'You are going to be re-direct to Users Page',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Confirm',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/users')
        this.app.Toast.fire('The email ' + person.email + ', you can search in the box and delete this user!', '', 'warning')
      } else if (result.isDenied) {
        this.app.Toast.fire('Changes are not saved', '', 'info')
      }
    })

  }


  // PAGINATION
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataObs$: Observable<any>;

  setPagination(listPersona) {
    this.dataSource = new MatTableDataSource<any>(listPersona);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs$ = this.dataSource.connect();
  }
}