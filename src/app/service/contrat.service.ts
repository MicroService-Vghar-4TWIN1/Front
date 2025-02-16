import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private apiUrl = 'http://localhost:8090/Contrat'; // URL de l'API Gateway

  constructor(private http: HttpClient) { }

  getContrats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/retrieve-all-contrats`);
  }
}
