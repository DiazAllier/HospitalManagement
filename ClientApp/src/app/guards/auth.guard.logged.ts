import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogged {

  constructor(private router: Router, private storageService: StorageService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.storageService.getLoggedIn().pipe(take(1), map((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    })
    );
  }
}