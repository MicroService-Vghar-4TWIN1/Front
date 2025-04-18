import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

export interface Universite {
  idUniv?: number;
  nomUniv: string;
  latitude?: number;
  longitude?: number;
}

@Injectable({ providedIn: 'root' })
export class UniversiteService {
  private baseUrl = 'http://localhost:8082/universite/universite';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.baseUrl}/retrieve-all-universites`);
  }

  getById(id: number): Observable<Universite> {
    return this.http.get<Universite>(`${this.baseUrl}/retrieve-universite/${id}`);
  }

  add(universite: Universite): Observable<Universite> {
    return this.http.post<Universite>(`${this.baseUrl}/add-universite`, universite);
  }

  update(universite: Universite): Observable<Universite> {
    return this.http.put<Universite>(`${this.baseUrl}/update-universite`, universite);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-universite/${id}`);
  }

updateLocation(id: number, latitude: number, longitude: number): Observable<Universite> {
  // Use proper URL encoding for parameters
  const url = `${this.baseUrl}/update-location/${id}?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`;

  return this.http.put<Universite>(url, {}).pipe(
    catchError(error => {
      console.error('Error updating location:', error);
      return throwError(error);
    })
  );
}

getMapLink(id: number): Observable<string> {
  return this.http.get(`${this.baseUrl}/map-link/${id}`, {
    responseType: 'text'
  }).pipe(
    catchError(error => {
      if (error.status === 400) {
        // Return empty string if coordinates are missing
        return of('');
      }
      // Re-throw other errors
      return throwError(error);
    })
  );
}
}
