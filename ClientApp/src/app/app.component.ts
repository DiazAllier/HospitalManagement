import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { authService } from './services/auth.service';
import { EventBusService } from './_shared/event-bus';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { DoctorService } from './services/doctor.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./appstyle.css']
})
export class AppComponent {
  public title = 'Hospital management';
  public username?: string


  eventBusSub?: Subscription;
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

  constructor(private authService: authService, private router: Router, private eventBusService: EventBusService, private nav: NavMenuComponent, private userService: UserService, private doctorService: DoctorService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.eventBusSub = this.eventBusService.on('logout', () => {
        this.nav.logout();
      });
    }, 200)
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }



}