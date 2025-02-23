import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  private apiUrl = 'http://localhost:8090/Ressource/'; // URL de l'API Gateway
  
    constructor(private http: HttpClient) { }
  
    getRessources(): Observable<any> {
      return this.http.get(`${this.apiUrl}/retrieve-all-ressources`);
    }

     // Récupérer une ressource par son ID
  getRessource(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/retrieve-ressource/${id}`);
  }

  addRessource(ressource: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-ressource`, ressource, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  

  // Supprimer une ressource par son ID
  deleteRessource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-ressource/${id}`);
  }

  // Modifier une ressource existante
  modifyRessource(ressource: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-ressource`, ressource);
  }
}
