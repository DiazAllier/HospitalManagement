import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { modelUser } from '../../../models/user.model';
import { AppComponent } from '../../../app.component';
import { ProfileComponent } from '../profile.component';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})

export class AccountSettingsComponent implements OnInit {
  edit_username = true;
  edit_email = true;
  username;
  currentUser: modelUser = new modelUser();
  constructor(private app: AppComponent, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private profile: ProfileComponent) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.currentUser = this.profile.currentUser;
    }, 100);
  }

  saveUser() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.saveUser(this.currentUser).subscribe({
          next: data => {
            this.refreshComponent();
            this.Toast.fire('Saved!', '', 'success')
          }, error: error => {
            this.Toast.fire('Changes are not saved', '', 'error')
            console.log(error);
          }
        })
      } else if (result.isDenied) {
        this.Toast.fire('Changes are not saved', '', 'info')
      }
    })
  }
  refreshComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

}