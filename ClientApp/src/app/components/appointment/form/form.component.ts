import { Component, OnInit } from '@angular/core';
import { modelSpecialist } from '../../../models/specialist.model';
import { modelDoctor } from '../../../models/doctor.model';
import { specialistService } from '../../../services/specialist.service';
import { hourService } from '../../../services/hour.service';
import { DoctorService } from '../../../services/doctor.service';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../../app.component';
import { modelSchedule } from '../../../models/schedule.model';
import { scheduleService } from '../../../services/schedule.service';
import { Patients } from '../../../models/patient.model';
import Swal from 'sweetalert2';
import { StorageService } from '../../../services/storage.service';
@Component({
  selector: 'app-form-appointment',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public specialistList: any = [];
  public doctorList: any = [];
  public hourList: any = [];

  public doctor: modelDoctor = new modelDoctor();
  public patient: Patients = new Patients();
  public schedules: modelSchedule = new modelSchedule();
  public specialists: modelSpecialist;
  public hour;
  public date: Date = new Date();
  public errors;
  minDate: Date;

  constructor(
    private doctorService: DoctorService,
    private specialist: specialistService,
    private title: Title,
    private hourService: hourService,
    private scheduleService: scheduleService,
    private storageService: StorageService,
    private app: AppComponent) {
    this.minDate = new Date();
  }
  ngOnInit() {
    this.title.setTitle('Schedule');
    this.getSpecialist();
  }
  loadData(e): void {
    let id = e;
    this.doctorService.getDoctorSpecialization(id).subscribe({
      next: data => {
        this.doctorList = data;
      }
    })
  }
  save(event: Event) {
    event.preventDefault();
  }

  schedule() {
    const user = this.storageService.getUser();
    this.schedules.date = this.date;
    this.schedules.idDoctor = this.doctor.id;
    this.schedules.startTime = this.hour;
    this.scheduleService.appointment(this.schedules).subscribe({
      next: d => {
        Swal.fire("Thank you for making an appointment with us, day: " + d.date).then((result) => {
          if (result.isConfirmed) {
            this.app.reloadCurrentRoute();
          }
        })
      }, error: error => {
        this.errors = error;
        console.log(error);
      }
    })
  }

  getSpecialist() {
    this.specialist.getSpecialist().subscribe({
      next: specialist => {
        this.specialistList = specialist;
        this.getHour();
      }, error: error => {
        console.log(error);
      }
    })
  }
  getHour() {
    this.hourList = this.hourService.getHour();
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  step = 0;
  setStep(index: number) {
    if (this.step == index) {
      this.getSpecialist();
    }
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
}