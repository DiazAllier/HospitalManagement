import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Patients } from '../../../models/patient.model';
import { ActivatedRoute } from '@angular/router';
import { patientService } from '../../../services/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AppComponent } from '../../../app.component';
declare var $: any;
@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.html',
  styleUrls: ['./css/list-patients.css']
})
export class patientsListComponent implements OnInit {
  constructor(private _patientService: patientService, private activatedRoute: ActivatedRoute,
    private title: Title, private _changeDetectorRef: ChangeDetectorRef, private app: AppComponent) { }

  //  VARI ABLES
  listPatient: Patients[];
  title_form: string;
  searchText;
  //  FIN VARIABLES

  ngOnInit(): void {
    this.title.setTitle('Patient list');
    this.getPatient();
  }


  getPatient(): void {
    this._patientService.getPatients().subscribe({
      next: data => {
        this.listPatient = data;
        this.setPagination(this.listPatient);
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