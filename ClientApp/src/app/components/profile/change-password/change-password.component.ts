import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationMatch } from '../../validator/validation-match/validation-match.component';
import { authService } from '../../../services/auth.service';
import { AppComponent } from '../../../app.component';
import { StorageService } from '../../../services/storage.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  constructor(private formBuilder: UntypedFormBuilder, private storageService: StorageService, private authService: authService, private app: AppComponent) { }
  errorMessage = '';
  isPasswordFailed = false;
  user_profile: any;
  form: UntypedFormGroup = new UntypedFormGroup({
    oldPassword: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
    confirmPassword: new UntypedFormControl(''),
  });


  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [ValidationMatch.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public changePassword() {
    this.user_profile = this.storageService.getUser();
    let id = this.user_profile.id;
    this.authService.changepassword(id, this.form.get('oldPassword').value, this.form.get('password').value).subscribe({
      next: data => {
        window.location.reload()
        this.app.Toast.fire({
          icon: 'success',
          title: 'Saved'
        })
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isPasswordFailed = true;
      }
    });
  }

}
