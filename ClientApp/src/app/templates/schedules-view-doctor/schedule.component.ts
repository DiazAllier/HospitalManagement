import { Component, OnInit } from '@angular/core';
import { modelSchedule } from '../../models/schedule.model';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { modelDoctor } from '../../models/doctor.model';
import { StorageService } from '../../services/storage.service';
import { scheduleService } from '../../services/schedule.service';
import { DoctorService } from '../../services/doctor.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public events: any[] = [{}];
  public options: any;
  public doctor: modelDoctor;
  schedules: modelSchedule[];
  constructor(private storageService: StorageService, private scheduleService: scheduleService, private doctorService: DoctorService) { }
  calendarOptions?: CalendarOptions;


  ngOnInit() {
    ;
    this.loadData();
  }

  loadData(): void {
    const user = this.storageService.getUser();
    this.doctorService.getDoctorByEmail(user.email).subscribe(doctor => {
      this.doctor = doctor;
      this.scheduleService.getAppointmentsByDoctor(0, this.doctor.id).subscribe(d => {
        this.schedules = d;
        d.forEach(e => {
          this.events.push({ title: 'Patient name: ' + e.patient.person.name + ' ' + e.patient.person.lastName, date: e.date + "T" + e.startTime })
          this.calendarOptions.events = this.events;
        })
      })
    });
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin],
      editable: false,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
    };
  }
}
