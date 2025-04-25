import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum Type {
  E_Book = 'E_Book',
  Cours = 'Cours',
  Article = 'Article'
}

export interface Ressource {
  titre: string;
  url: string;
  pdf: string;
  description: string;
  type: Type;
  idRessource?: number;
  idContrat?: number; 
}

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private apiUrl = 'http://localhost:8090/Ressource';

  constructor(private http: HttpClient) { }

  getRessources(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.apiUrl);
  }

  getRessource(id: number): Observable<Ressource> {
    return this.http.get<Ressource>(`${this.apiUrl}/${id}`);
  }

  addRessource(ressource: Ressource): Observable<Ressource> {
    return this.http.post<Ressource>(this.apiUrl, ressource);
  }

  updateRessource(ressource: Ressource): Observable<Ressource> {
    return this.http.put<Ressource>(this.apiUrl, ressource);
  }
  
  
  getContratById(idContrat: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contrat/${idContrat}`);
  }

  getAllContrats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contrats`);
  }
  

  deleteRessource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStats(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/stats`);
  }

  // getSummary(id: number): Observable<string> {
  //   return this.http.get(`${this.apiUrl}/${id}/summary`, { responseType: 'text' });
  // }
  
  
}