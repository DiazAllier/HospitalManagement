import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DoctorService } from '../../../../services/doctor.service';
import Swal from 'sweetalert2';
import { patientService } from '../../../../services/patient.service';
import { StorageService } from '../../../../services/storage.service';
import { modelDoctor } from '../../../../models/doctor.model';

@Component({
  selector: 'app-doctor-patient',
  templateUrl: './doctor-patient.component.html',
  styleUrls: ['./doctor-patient.component.css']
})
export class DoctorPatientComponent implements OnInit {
  public title_form;
  public searchText;
  public doctor: modelDoctor;
  public id: number;

  constructor(
    private doctorService: DoctorService,
    private patientService: patientService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private Router: Router,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadPatients()
      this.doctor = this.storageService.currentDoctor.getValue();
      console.log(this.doctor)
    }, 500);
  }

  loadPatients(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      this.id = this.activatedRoute.snapshot.params.id;
      if (id > 0) {
        this.title_form = 'Edit Professional';
      } else {
        this.title_form = 'New Professional';
      }
      if (id) {
        this.doctorService.getDoctorPatients(id).subscribe({
          next: data => {
            this.setPagination(data);
          }
        })
      }
    })
  }

  addPatient() {
    Swal.fire({
      title: 'Patient email',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return this.patientService.getPatientByEmail(email).subscribe({
          next: response => {
            return this.patientService.assignDoctor(response.id, this.doctor.id).subscribe({
              next: data => {
                this.loadPatients()
                console.log(data)
              }
              , error: error => {
                console.log(error)
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              }
            })
          }, error: error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          }
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Patient added!",
        })
      }
    })
  }
  discharge(patient: any): void {
    this.doctorService.dischargePatient(this.id, patient.id).subscribe(d => {
      this.Router.navigate(['/doctor']);
      Swal.fire(d.message)
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
