import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { KeycloakService } from '../keyclock.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  
  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip adding token for Keycloak endpoints
    if (request.url.includes('keycloak')) {
      return next.handle(request);
    }

    // Get the token
    const token = this.keycloakService.instance?.token;
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle token expiration
          this.keycloakService.login();
        }
        return throwError(error);
      })
    );
  }
}