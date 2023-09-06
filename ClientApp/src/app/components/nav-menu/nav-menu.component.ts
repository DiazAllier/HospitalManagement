import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './index.html',
  styleUrls: ['./navbar.css']
})


export class NavMenuComponent {
  private currentUser: any;
  public currentDoctor: any;
  private roles: string[] = [];
  private type: string;
  public username?: string;
  public isLoggedIn = false;
  public showAdminBoard = false;
  public showDoctorBoard = false;
  public showPatientBoard = false;
  private subscription: Subscription;
  sidebarVisible2: boolean;
  constructor(private storageService: StorageService, private route: Router) { }


  ngOnInit(): void {
    this.subscription = this.storageService.getLoggedIn().subscribe(value => {
      this.isLoggedIn = value;
      setTimeout(() => {
        if (this.isLoggedIn) {
          this.currentUser = this.storageService.getUser();
          this.roles = this.currentUser.roles;
          this.type = this.currentUser.userType;
          this.username = this.currentUser.username;
          this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
          this.showDoctorBoard = this.type.includes('DOCTOR');
          this.showPatientBoard = this.type.includes('PATIENT');
          if (this.showDoctorBoard) {
            this.currentDoctor = this.storageService.getDoctor();
          }
        }
      }, 200)
    })
  }

  logout(): void {
    this.storageService.signOut()
    this.isLoggedIn = false;
    this.roles = [];
    this.showAdminBoard = false;
    this.showDoctorBoard = false;
    this.showPatientBoard = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
