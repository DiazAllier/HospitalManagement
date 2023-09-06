import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { modelDoctor } from '../models/doctor.model';
import { modelUser } from '../models/user.model';
import { DoctorService } from './doctor.service';


const USER_KEY = 'auth-user';
const DOCTOR_KEY = 'user-doctor';
const TOKEN_KEY = 'auth-token';
const ENABLE_KEY = 'auth-enable';
const LOGGED_KEY = 'log-key';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public currentUser: BehaviorSubject<modelUser>;
  public currentDoctor: BehaviorSubject<modelDoctor>;
  private userLoggedIn = new BehaviorSubject(false);
  constructor(private router: Router, private doctorService: DoctorService) {
    this.currentUser = new BehaviorSubject<modelUser>(JSON.parse(window.sessionStorage.getItem(USER_KEY)));
    this.currentDoctor = new BehaviorSubject<modelDoctor>(JSON.parse(window.sessionStorage.getItem(DOCTOR_KEY)));
    this.userLoggedIn = new BehaviorSubject(JSON.parse(window.sessionStorage.getItem(LOGGED_KEY)));
  }
  signOut(): void {
    window.sessionStorage.clear();
    this.currentUser.next(null);
    this.currentDoctor.next(null);
    this.userLoggedIn.next(null);
    this.router.navigate(['/login']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  public saveUser(user: any): void {
    const user_info = {
      roles: user.roles,
      userType: user.userType,
      username: user.username,
      email: user.email
    }
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user_info));
    this.currentUser.next(user);
    this.userEnable(user.userEnable)
    this.saveToken(user.token)
    if (user.userType == "DOCTOR") {
      this.saveDoctor(user);
    }
  }

  public saveDoctor(user: any): void {
    this.doctorService.getDoctorByEmail(user.email).subscribe(d => {
      const doctor_info = {
        id: d.id,
        license: d.license
      }
      this.currentDoctor.next(d);
      window.sessionStorage.removeItem(DOCTOR_KEY);
      window.sessionStorage.setItem(DOCTOR_KEY, JSON.stringify(doctor_info));
    })
  }

  public getDoctor(): any {
    if (this.currentDoctor) {
      return this.currentDoctor.value;
    }
    return {};
  }

  public getUser(): any {
    if (this.currentUser != null) {
      return this.currentUser.value;
    }
    return {};
  }

  public getUsername(): any {
    if (this.currentUser) {
      return this.currentUser.value.username;
    }
    return {};
  }

  public getUserType(): any {
    if (this.currentUser) {
      return this.currentUser.value.userType;
    }
    return {};
  }

  public getLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  public setLoggedIn(val: boolean) {
    window.sessionStorage.removeItem(LOGGED_KEY);
    window.sessionStorage.setItem(LOGGED_KEY, JSON.stringify(val));
    this.userLoggedIn.next(val);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public userEnable(enable: string): void {
    window.sessionStorage.removeItem(ENABLE_KEY);
    window.sessionStorage.setItem(ENABLE_KEY, enable);
  }
  public getEnable(): string | null {
    return window.sessionStorage.getItem(ENABLE_KEY);
  }

}