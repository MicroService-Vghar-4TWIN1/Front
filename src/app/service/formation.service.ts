import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 enum statut {
  EN_COURS = 'EN_COURS',
  TERMINEE = 'TERMINEE',
  PLANNIFIEE = 'PLANNIFIEE'
}
export interface Formation {
  id?: number;
  dateFormation: Date;
  description: string;
  nomFormation: string;
  nombrePlace: number;
  prix: number;
  statut: statut;
}

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8090/formation';

  constructor(private http: HttpClient) { }

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  updateFormationPlaces(formationId: number, newPlaces: number): Observable<Formation> {
    return this.http.patch<Formation>(`${this.apiUrl}/${formationId}`, {
      nombrePlace: newPlaces
    });
  }


  getFormation(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl.replace(/\/$/, '')}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addFormation(formationData: Formation): Observable<Formation> {
    return this.http.post<Formation>(this.apiUrl, formationData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateFormation(id: number, formationData: any): Observable<Formation> {
    return this.http.patch<Formation>(`${this.apiUrl.replace(/\/$/, '')}/${id}`, formationData);
  }

  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error?.error_description) {
        errorMessage += `\nDetails: ${error.error.error_description}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
