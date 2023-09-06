import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { modelDoctor } from '../../../../models/doctor.model';
import { DoctorService } from '../../../../services/doctor.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit {

  public doctor: modelDoctor = new modelDoctor();
  constructor(private serviceDoctor: DoctorService, private activatedRoute: ActivatedRoute, private storageService: StorageService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadDoctor();
    }, 1000);
  }

  loadDoctor(): void {
    if (this.storageService.currentDoctor != null) {
      let id = this.storageService.currentDoctor.value.id;
      this.serviceDoctor.getById(id).subscribe({
        next: data => {
          this.doctor = data;
        }
      })
    } else {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if (id) {
          this.serviceDoctor.getById(id).subscribe({
            next: data => {
              this.doctor = data;
            }
          })
        }
      })
    }
  }

}
