import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { Person } from '../../../models/person.model';
import { roles } from '../../../models/roles.model';
import { modelUser } from '../../../models/user.model';
import { CountryService } from '../../../services/country.service';
import { UserService } from '../../../services/user.service';
import { authService } from '../../../services/auth.service';
import { personService } from '../../../services/person.service';
@Component({
  selector: 'app-personform',
  templateUrl: './person-form.html',
  styleUrls: ['./css/form-validation.css']
})

export class personFormComponent implements OnInit {


  public user: modelUser = new modelUser();
  public person: Person = new Person();
  public roles: roles[];
  public rolesLoad: roles[];
  public title_form;
  public options;
  public isLoginFailed = false;
  public errorMessage = '';
  public newUser = false;
  public states;
  public maxDate = new Date();
  public maxSSNInput = 11;
  public ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
  public showSSN = false;
  public showPassword = false;
  public minDate: Date;

  //FIN VARIABLES 

  constructor(private person_service: personService, private activatedRoute: ActivatedRoute, private Router: Router,
    private title: Title, private countryService: CountryService, private AuthSvc: authService, private app: AppComponent, private userService: UserService) {
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 21);
  }
  ngOnInit(): void {
    this.loadPerson();
  }

  loadPerson(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id > 0) {
        this.title_form = "Edit Person";
        this.title.setTitle('Person Form');
        this.newUser = false;
      } else {
        this.title_form = "New User";
        this.title.setTitle('User Form');
        this.newUser = true;
      }
      if (id) {
        this.person_service.getById(id).subscribe({
          next: data => {
            this.person = data;
          }
        })
      }
    })
    this.loadStates()
    this.loadUserRoles()
  }

  loadStates(): void {
    this.countryService.getState().subscribe({
      next: data => {
        this.states = data.data.states;
      }
    })
  }
  loadUserRoles(): void {
    this.userService.getUsersRoles().subscribe({
      next: data => {
        this.rolesLoad = data;
      }
    })
  }

  save(f: NgForm) {
    console.log(f.getError)
    if (this.newUser && f.valid) {
      this.person.email = this.user.email
      this.user.person = this.person
      this.AuthSvc.register(this.user).subscribe({
        next: data => {
          this.Router.navigate(['/person']);
          this.app.Toast.fire({
            icon: 'success',
            title: 'User ' + this.user.username + ' saved'
          })
        },
        error: err => {
          this.errorMessage = err;
          this.isLoginFailed = true;
          console.log(err)
        }
      });
    } if (!this.newUser && f.valid) {
      this.person_service.savePerson(this.person).subscribe({
        next: data => {
          this.app.Toast.fire({
            icon: 'success',
            title: data.name + ' ' + data.lastName + ' saved'
          })
          this.Router.navigate(['/person']);
        }, error: error => {
          console.log(error);
          this.app.Toast.fire({
            icon: 'error',
            title: 'Error!'
          })
        }
      })
    }
  }


  public toggleSSNValue(a: string): void {
    if (a == 'p') {
      this.showPassword = !this.showPassword;
    }
    if (a == 'ssn') {
      this.showSSN = !this.showSSN;
    }

  }

  public getSSNType(a: string): string {
    if (a == 'p') {
      return this.showPassword ? 'text' : 'password';
    }
    if (a == 'ssn') {
      return this.showSSN ? 'text' : 'password';
    }
  }

  public inputSSN(): void {
    this.person.socialSecNumber = this.getSSNValidFormat(this.person.socialSecNumber);
  }
  public getSSNValidFormat(ssn: string): string | null {
    if (ssn === null || ssn === undefined) { return null; }
    const pattern = /\d{3}-\d{2}-\d{4}/g;

    let formattedSSN = ssn as any;
    const result = pattern.test(formattedSSN);
    if (!result) {
      formattedSSN = formattedSSN.match(/\d*/g).join('')
        .match(/(\d{0,3})(\d{0,2})(\d{0,4})/).slice(1).join('-')
        .replace(/-*$/g, '');
    }
    return formattedSSN;
  }

}