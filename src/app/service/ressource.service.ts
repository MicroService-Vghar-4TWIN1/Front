import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:8090/Ressource';

  constructor(private http: HttpClient) { }

  getRessources(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.apiUrl);
  }

  getRessource(id: number): Observable<Ressource> {
    return this.http.get<Ressource>(`${this.apiUrl}/${id}`);
  }

  addRessource(ressourceData: any, pdfFile?: File): Observable<any> {
    const formData = new FormData();
    
    if (ressourceData.titre) formData.append('titre', ressourceData.titre);
    if (ressourceData.url) formData.append('url', ressourceData.url);
    if (ressourceData.description) formData.append('description', ressourceData.description);
    formData.append('type', ressourceData.type);
    if (pdfFile) formData.append('pdfFile', pdfFile);

    return this.http.post(this.apiUrl, formData);
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

  getSummary(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${id}/summary`, { responseType: 'text' });
  }
  
  
}