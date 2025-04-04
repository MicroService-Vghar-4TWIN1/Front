import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloakUrl = 'http://localhost:8091/realms/UserKeyclock/protocol/openid-connect/token';
  private clientId = 'user-microservice';
  private clientSecret = 'Xbz1v1TzMbM5ToQSJXpSP3nzNstU0FV0';  

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(this.keycloakUrl, body.toString(), { headers });
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
