import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DoctorService } from '../../../services/doctor.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.html',
  styleUrls: ['./css/doctor-list.css']
})

export class doctorListComponent implements OnInit {
  constructor(private doctorService: DoctorService, private activatedRoute: ActivatedRoute,
    private title: Title, private _changeDetectorRef: ChangeDetectorRef, private app: AppComponent) { }

  public searchText;

  ngOnInit(): void {
    this.title.setTitle('Doctor List');
    this.getDoctor()
  }

  getDoctor() {
    this.doctorService.getDoctor().subscribe({
      next: doctor => {
        this.setPagination(doctor);
      }, error: error => {
        console.log(error);
      }
    })
  }


  // PAGINATION
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