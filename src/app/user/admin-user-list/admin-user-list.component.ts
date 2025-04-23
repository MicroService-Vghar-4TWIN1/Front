import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ContratService } from './../../service/contrat.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  users: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private contratService: ContratService
  ) {}

  ngOnInit(): void {
    console.log('AdminUserListComponent initialized');
    this.loading = true;

    const token = localStorage.getItem('token'); // Get token securely

    if (token) {
      this.http.get('http://localhost:8090/Contrat/keycloak-users', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }).pipe(
        catchError(err => {
          console.error('Erreur Keycloak users:', err);
          return throwError(() => err);
        })
      ).subscribe({
        next: (data) => {
          console.log('Keycloak users récupérés:', data);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des utilisateurs Keycloak:', err);
        }
      });
    }

    this.contratService.getAllUsers().subscribe({
      next: (data) => {
        console.log('Utilisateurs récupérés avec succès:', data);
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs', err);
        this.error = err.status === 401 
          ? 'Authentication required. Please login again.'
          : 'Failed to load users';
        this.loading = false;
      }
    });
  }
}
