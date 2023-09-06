import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../../../app.component';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  constructor(private serviceUser: UserService, private activatedRoute: ActivatedRoute,
    private title: Title, private _changeDetectorRef: ChangeDetectorRef, private app: AppComponent) { }

  //  VARI ABLES
  public title_form: string;
  public searchText;
  //  FIN VARIABLES

  ngOnInit(): void {
    this.title.setTitle('User list');
    this.getUsers();
  }


  getUsers(): void {
    this.serviceUser.getUsers().subscribe({
      next: data => {
        this.setPagination(data);
      }, error: error => {
        console.log(error);
      }
    })

  }

  deleteUser(user: any) {
    Swal.fire({
      title: 'Would you like to delete ' + user.email + '?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceUser.deleteUser(user.id).subscribe({
          next: data => {
            this.getUsers();
            this.app.Toast.fire(user.username + ' has been deleted successfully!', '', 'warning')
          }, error: error => {
            this.app.Toast.fire('Error, Something went wrong!', '', 'error')
            console.log(error);
          }
        })
      } else if (result.isDenied) {
        this.app.Toast.fire('Changes are not saved', '', 'info')
      }
    })
  }


  // PAGINATION
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataObs$: Observable<any>;

  setPagination(listPacientes) {
    this.dataSource = new MatTableDataSource<any>(listPacientes);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs$ = this.dataSource.connect();
  }

}