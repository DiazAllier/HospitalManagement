import { Component } from '@angular/core';
import { Person } from '../../../models/person.model';
import { NgForm } from '@angular/forms';
import { authService } from '../../../services/auth.service';
import { modelRegisterFind } from '../../../models/auth.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public person: Person = new Person();
  public model: modelRegisterFind = new modelRegisterFind();
  public minDate: Date;
  public errorMessage: string;
  constructor(private servicesAuth: authService) {
    this.minDate = new Date();
  }

  checkPerson(f: NgForm) {
    if (f.valid) {
      this.model.firstName = this.person.name;
      this.model.lastName = this.person.lastName;
      this.model.dob = this.person.dob;
      this.servicesAuth.registerFind(this.model).subscribe({
        next: d => {
          Swal.fire("Hello " + d.name + " " + d.lastName, "We found your records with us!, contact us to get more information about your account", "success")
        }, error: err => {
          this.errorMessage = err.error.message;
          Swal.fire("Error!", this.errorMessage, "error")
        }
      })
    }
  }
}
