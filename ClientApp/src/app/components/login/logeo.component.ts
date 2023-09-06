import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modelUser } from '../../models/user.model';
import { authService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-logeo',
  templateUrl: './logeo.component.html',
  styleUrls: ['./logeo.component.css']
})
export class LoginComponent implements OnInit {

  public users: modelUser = new modelUser();
  hide = true;
  isLoginFailed = false;
  emailCheck = false;
  verified = true;
  errorMessage = '';
  roles: string[] = [];
  modal = '';
  constructor(
    private authService: authService, private storageService: StorageService,
    private router: Router
  ) {

  }
  ngOnInit() {

  }

  login(f: NgForm): void {
    if (f.valid) {
      this.authService.login(this.users.username.toLowerCase(), this.users.password.toLowerCase()).subscribe({
        next: data => {
          this.storageService.saveUser(data);
          this.storageService.setLoggedIn(true);
          this.roles = this.storageService.getUser().roles;
          this.isLoginFailed = false;
          this.router.navigate(['/home']);
          this.verified = true;
        },
        error: err => {
          this.storageService.setLoggedIn(false);
          this.errorMessage = err;
          this.isLoginFailed = true;
          this.modal = '';
          if (this.errorMessage == "Account not verified") {
            this.verified = false;
            this.modal = 'modal';
          }
        }
      })
    }

  }




}
