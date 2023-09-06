import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { modelDoctor } from '../../../../models/doctor.model';
import { modelSchedule } from '../../../../models/schedule.model';
import { scheduleService } from '../../../../services/schedule.service';

@Component({
  selector: 'app-schedules-status',
  templateUrl: './schedules-status.component.html',
  styleUrls: ['./schedules-status.component.css']
})
export class SchedulesStatusComponent implements OnInit {

  constructor(private scheduleService: scheduleService,
    private activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef) { }

  public type: number;
  public schedule: modelSchedule = new modelSchedule();
  public doctor: modelDoctor = new modelDoctor();
  public searchText;

  ngOnInit(): void {
  }
  loadSchedules(type: any): void {
    this.type = type?.target.value;
    console.log(this.type)
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.scheduleService.getAppointmentsByDoctor(this.type, id).subscribe({
          next: data => {
            this.setPagination(data);
          }
        })
      }
    })
  }

  status(id: number, status: number): void {
    this.schedule.id = id;
    this.schedule.status = status;
    this.scheduleService.setStatus(this.schedule).subscribe({
      next: data => {
        this.loadSchedules(1);
      }, error: err => {
        console.log(err)
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
