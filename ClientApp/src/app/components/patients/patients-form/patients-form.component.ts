import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { Patients } from '../../../models/patient.model';
import { DoctorService } from '../../../services/doctor.service';
import { patientService } from '../../../services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patients-form',
  templateUrl: './patients-form.html',
})


export class patientsFormComponent implements OnInit {

  title: string;
  public patient: Patients = new Patients();
  public doctor: any;
  public hasDoctor = false;
  constructor(private patientService: patientService, private Router: Router, private routerActivated: ActivatedRoute,
    private titles: Title, private app: AppComponent, private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.titles.setTitle('Patient form');
    this.loadPatients();
  }

  loadPatients(): void {
    this.routerActivated.params.subscribe(params => {
      let id = params['id'];
      if (id > 0) {
        this.title = "Edit Patient"
      } else {
        this.title = "New Patient"
      }
      if (id) {
        this.patientService.getById(id).subscribe(p => {
          this.patient = p;
          this.loadDoctor();
          if (this.patient.doctor != null) {
            this.hasDoctor = true;
          } else {
            this.hasDoctor = false;
          }
        })
      }
    })
  }

  loadDoctor(): void {
    if (this.patient.doctor != null) {
      this.patientService.getPatientDoctor(this.patient.id).subscribe(d => {
        this.doctor = d;
      })
    } else {
      this.doctorService.getDoctor().subscribe(d => {
        this.doctor = d;
      })
    }
  }

  savePatients() {
    this.patientService.savePatients(this.patient).subscribe({
      next: data => {
        this.app.Toast.fire({
          icon: 'success',
          title: 'Patient ' + data.person.name + ' ' + data.person.lastName + ' saved'
        })
        if (!this.hasDoctor) {
          this.patientService.assignDoctor(this.patient.id, this.patient.doctor.id).subscribe({
            next: data => {
              Swal.fire(data.message)
            }
          })
        }
        this.Router.navigate(['/patients']);
      }, error: error => {
        console.log(error);

        this.app.Toast.fire({
          icon: 'error',
          title: 'Changes are not saved!'
        })
      }
    })
  }

}



