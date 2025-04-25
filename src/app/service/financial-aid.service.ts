import { KeycloakService } from 'src/app/service/keyclock.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface FinancialAidRequest {
  _id?: string;
  studentId?: string;
  createdBy?: string;
  amountRequested: number;
  reason: string;
  status?: 'pending' | 'approved' | 'rejected';
  dateSubmitted?: string;
  dateReviewed?: string;
  departmentId?: number;

}

@Injectable({
  providedIn: 'root'
})
export class FinancialAidService {
  baseUrl = 'http://localhost:8090/finance';

  constructor(private http: HttpClient , private KeycloakService: KeycloakService) {}

  private getHeaders(): HttpHeaders {
    const token = this.KeycloakService.getToken();
    console.log('Token being sent:', token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  getDepartments() {
    return this.http.get<any[]>('http://localhost:8090/finance/departments');
  }

  getAll(): Observable<FinancialAidRequest[]> {
    return this.http.get<FinancialAidRequest[]>(this.baseUrl, { headers: this.getHeaders() });
  }


  getById(id: string): Observable<FinancialAidRequest> {
    return this.http.get<FinancialAidRequest>(`${this.baseUrl}/${id}`);
  }
  add(request: FinancialAidRequest): Observable<FinancialAidRequest> {
    return this.http.post<any>(
      this.baseUrl, 
      request, 
      { 
        headers: this.getHeaders(),
        observe: 'response' // Get full response
      }
    ).pipe(
      map(response => {
        if (response.body && response.body.success) {
          return response.body.data;
        }
        throw new Error('Invalid response format');
      }),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error(
          error.error?.error || 'Failed to create request'
        ));
      })
    );
  }


  update(id: string, request: Partial<FinancialAidRequest>): Observable<FinancialAidRequest> {
    return this.http.put<FinancialAidRequest>(`${this.baseUrl}/${id}`, request);
  }
  updateStatus(id: string, status: string): Observable<FinancialAidRequest> {
    return this.http.put<FinancialAidRequest>(`${this.baseUrl}/${id}/status`, { status });
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}