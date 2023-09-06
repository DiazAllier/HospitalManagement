import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  constructor(private router: Router, private storageService: StorageService, private userService: UserService) { }
  private getUser: any;
  public currentUser: any;
  public currentDoctor: any;
  ngOnInit(): void {
    this.loadUsers();
    this.router.navigate(['profile/settings'])
  }

  loadUsers(): void {
    this.getUser = this.storageService.getUser();
    let username = this.getUser.username;
    if (this.storageService.getLoggedIn()) {
      this.userService.getByUsername(username).subscribe(p => {
        this.currentUser = p;
      })
    }
  }

}

