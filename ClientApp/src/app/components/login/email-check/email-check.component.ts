import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { modelEmail, confirmationToken } from '../../../models/auth.model';
import { authService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.css']
})
export class EmailCheckComponent implements OnInit {

  public token: confirmationToken = new confirmationToken();
  public email: modelEmail = new modelEmail();
  public error_message = null;
  @ViewChild('closeButton') closeButton;
  constructor(private authSvc: authService, private Router: Router, private app: AppComponent) { }

  ngOnInit(): void {
  }

  checkToken() {
    this.authSvc.checkToken(this.token.confirmationToken).subscribe({
      next: data => {
        Swal.fire({
          title: data.message,
          text: "Your account has been activated, you can log in to your account!",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Return to login screen'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
        this.closeButton.nativeElement.click();
      }, error: err => {
        this.error_message = err.error.message;
      }
    })
  }
}
