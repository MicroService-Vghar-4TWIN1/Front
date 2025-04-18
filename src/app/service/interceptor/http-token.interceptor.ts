// http-token.interceptor.ts
import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { KeycloakService } from './../keyclock.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  
  constructor(@Inject(KeycloakService) private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.keycloakService.instance?.token;
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(request);

    
  }
}