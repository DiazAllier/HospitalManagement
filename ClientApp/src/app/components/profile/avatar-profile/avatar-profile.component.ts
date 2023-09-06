import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { UserService } from '../../../services/user.service';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-avatar-profile',
  templateUrl: './avatar-profile.component.html',
  styleUrls: ['./avatar-profile.component.css']
})
export class AvatarProfileComponent implements OnInit {
  public url = '';
  public error_image = false;
  public edit = false;
  public currentUser: any;

  constructor(private userService: UserService, private app: AppComponent, private profile: ProfileComponent) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.currentUser = this.profile.currentUser;
    }, 100);
  }

  public save() {
    this.currentUser.image = this.url;
    this.userService.saveUser(this.currentUser).subscribe({
      next: data => {
        window.location.reload()
        this.app.Toast.fire({
          icon: 'success',
          title: 'Saved'
        })
      }
    })
  }

  public delete() {
    this.edit = false;
    this.error_image = false;
    this.url = this.currentUser.image;
  }

  public handleMissingImage(e) {
    setTimeout(() => {
      if (e.type == 'error') {
        this.url = this.currentUser.image;
        this.error_image = true;
      }
    }, 500);

  }
}
