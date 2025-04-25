import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FinancialAidRequest {
  _id?: string;
  studentId?: string;
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
  baseUrl = 'http://localhost:3000/finance';

  constructor(private http: HttpClient) {}
  getDepartments() {
    return this.http.get<any[]>('http://localhost:3000/finance/departments');
  }
  getAll(): Observable<FinancialAidRequest[]> {
    return this.http.get<FinancialAidRequest[]>(this.baseUrl);
  }
  getById(id: string): Observable<FinancialAidRequest> {
    return this.http.get<FinancialAidRequest>(`${this.baseUrl}/${id}`);
  }
  add(request: Partial<FinancialAidRequest>): Observable<FinancialAidRequest> {
    return this.http.post<FinancialAidRequest>(this.baseUrl, request);
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