import { KeycloakService } from './keyclock.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrat } from '../model/Contrat';


@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private apiUrl = 'http://localhost:8090/Contrat'; // URL de l'API Gateway
  private apiUrluser = 'http://localhost:8090/Contrat/keycloak-users';


  constructor(private http: HttpClient, private KeycloakService: KeycloakService) {}


  getContrats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/retrieve-all-contrats`);
  }
  addContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.apiUrl}/add-contrat`, contrat);
  }


  getContratById(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.apiUrl}/retrieve-contrat/${id}`);
  }


  updateContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.apiUrl}/update-contrat`, contrat);
  }

  deleteContrat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-contrat/${id}`);
  }


  getHistoriqueByContrat(contratId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-historique/${contratId}`);
  }


  getAllUsers(): Observable<any[]> {
    const token = this.KeycloakService.getToken();
    console.log('Token utilisé dans la requête:', token);
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any[]>(`${this.apiUrluser}`, { headers });
  }
  
  
}
