import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { authService } from '../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventBusService } from '../_shared/event-bus';
import { StorageService } from '../services/storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing$ = new BehaviorSubject<boolean>(false);
  constructor(private storageService: StorageService, private authService: authService,
    private eventBusService: EventBusService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request);
  }
}