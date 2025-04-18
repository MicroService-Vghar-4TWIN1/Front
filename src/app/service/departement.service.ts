import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Departement {
  idDepart?: number;             // optional when creating
  nomDepart: string;
  description?: string;
  code: string;
  createdDate: string;          // use string (ISO format) for dates when communicating with backend
  email: string;
  phone: string;
  active: boolean;
  universiteName: string;  
  idUniversite: number     // optional when creating
}
@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private baseUrl = 'http://localhost:8090/departementMicroService';
  
    constructor(private http: HttpClient) {}
  
    getAll(): Observable<Departement[]> {
      return this.http.get<Departement[]>(`${this.baseUrl}/retrieve-all-departements`);
    }
    getUniversityById(idUniversite: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/uni/${idUniversite}`);
    }
  
    getById(id: number): Observable<Departement> {
      return this.http.get<Departement>(`${this.baseUrl}/retrieve-departement/${id}`);
    }
  
    add(departement: Departement): Observable<Departement> {
      return this.http.post<Departement>(`${this.baseUrl}/add-departement`, departement);
    }
  
    update(departement: Departement, id:any): Observable<Departement> {
      return this.http.put<Departement>(`${this.baseUrl}/update-departement/${id}`, departement);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/remove-departement/${id}`);
    }
}
