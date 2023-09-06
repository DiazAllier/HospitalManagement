import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modelDoctor } from '../../../models/doctor.model';
import { personService } from '../../../services/person.service';
import { specialistService } from '../../../services/specialist.service';
import { DoctorService } from '../../../services/doctor.service';
import { Title } from '@angular/platform-browser';
import { Person } from '../../../models/person.model';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.html',
  styleUrls: ['./css/doctor.css'],
})

export class doctorFormComponent implements OnInit {

  public favoriteSeason: string;

  public disabled = false;
  public forms: UntypedFormGroup;
  public TipoHora: string;
  public isLinear = true;
  public primerFormGroup: UntypedFormGroup;
  public segundoFormGroup: UntypedFormGroup;


  public specialistList: any = [];
  public personList: any = [];
  public doctor: modelDoctor = new modelDoctor();
  public person: Person = new Person();

  public title_form;
  //FIN VARIABLES

  constructor(
    private doctorService: DoctorService,
    private specialist: specialistService,
    private personService: personService,
    private activatedRoute: ActivatedRoute,
    private Router: Router,
    private title: Title,
    private app: AppComponent) {
  }

  ngOnInit(): void {
    this.title.setTitle('Doctor Form');
    this.loadMedico();
  }

  loadMedico(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getSpecialist();
      this.getPerson();
      let id = params['id']
      if (id > 0) {
        this.title_form = 'Edit Professional';
      } else {
        this.title_form = 'New Professional';
      }
      if (id) {
        this.doctorService.getById(id).subscribe({
          next: data => {
            this.doctor = data;
          }
        })
      }
    })
  }
  getSpecialist() {
    this.specialist.getSpecialist().subscribe({
      next: specialist => {
        this.specialistList = specialist;
      }, error: error => {
        console.log(error);
      }
    })
  }

  getPerson() {
    this.personService.getPerson().subscribe({
      next: person => {
        this.personList = person;
      }, error: error => {
        console.log(error);
      }
    })
  }

  saveDoctor() {
    this.doctorService.saveDoctor(this.doctor).subscribe({
      next: data => {
        this.app.Toast.fire({
          icon: 'success',
          title: 'Doctor saved'
        })
        this.Router.navigate(['/doctor']);
      }, error: error => {
        console.log(error);
      }
    })
  }

}