
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private storageService: StorageService) { }
  // private isAuth = this.storageService.getLoggedIn();

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.storageService.getLoggedIn().pipe(take(1), map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        const user = this.storageService.getUser();
        const userRole: string[] = user.roles;

        const { roles } = next.data;
        if (roles) {
          roles.forEach(element => {
            if (roles && userRole.indexOf(element) == -1) {
              this.router.navigate(['/notfound']);
              return false;
            }
            return true
          });
        }
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    })
    );
  }
}