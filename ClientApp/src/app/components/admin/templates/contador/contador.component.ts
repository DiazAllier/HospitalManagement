import { Component, OnInit } from '@angular/core';
import { modelDoctor } from '../../../../models/doctor.model';
import { Patients } from '../../../../models/patient.model';
import { DoctorService } from '../../../../services/doctor.service';
import { patientService } from '../../../../services/patient.service';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {

  constructor(private doctorService: DoctorService, private patientService: patientService) { }

  public doctor: modelDoctor[];
  public patients: Patients[];

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.doctorService.getDoctor().subscribe(d => {
      this.doctor = d;
    })
    this.patientService.getPatients().subscribe(p => {
      this.patients = p;
    })
  }

}
