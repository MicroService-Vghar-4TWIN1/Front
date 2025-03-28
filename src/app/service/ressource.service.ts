import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum Type {
  E_Book = 'E_Book',
  Cours = 'Cours',
  Article = 'Article'
}

export interface Ressource {
  idRessource?: number;
  titre: string;
  url: string;
  pdf: string;
  description: string;
  type: Type;
}

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private apiUrl = 'http://localhost:8082/Ressource';

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

  deleteRessource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStats(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/stats`);
  }
}