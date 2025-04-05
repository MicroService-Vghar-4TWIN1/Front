import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloakTokenUrl = 'http://localhost:8092/realms/projet/protocol/openid-connect/token';
  private clientId = 'microservice';
  private clientSecret = 'KntS6kIEdjnonuVBp8VlwuyZ4suHfFhf';

  private adminClientId = 'admin-cli';
  private adminClientSecret = 'your_admin_client_secret'; // Remplace avec le vrai
  private adminTokenUrl = 'http://localhost:8092/realms/master/protocol/openid-connect/token';
  private createUserUrl = 'http://localhost:8092/admin/realms/projet/users';

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

    return this.http.post<any>(this.keycloakTokenUrl, body.toString(), { headers });
  }

  signup(username: string, email: string, password: string) {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.adminClientId);
    body.set('client_secret', this.adminClientSecret);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return new Promise((resolve, reject) => {
      this.http.post<any>(this.adminTokenUrl, body.toString(), { headers }).subscribe({
        next: (tokenRes) => {
          const token = tokenRes.access_token;

          const userPayload = {
            username: username,
            email: email,
            enabled: true,
            credentials: [{
              type: 'password',
              value: password,
              temporary: false
            }]
          };

          const userHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          });

          this.http.post(this.createUserUrl, userPayload, { headers: userHeaders }).subscribe({
            next: () => resolve('created'),
            error: (err) => reject(err)
          });
        },
        error: (err) => reject(err)
      });
    });
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
