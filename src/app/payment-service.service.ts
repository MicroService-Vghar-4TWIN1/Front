import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://192.168.174.129:8090/formation/api/payment'; // Update this to your backend URL

  constructor(private http: HttpClient) { }

  createCheckoutSession(formationId: number, amount: number, name: string): Observable<string> {
    const payload = {
      formationId: formationId,
      amount: amount,  // Amount should be passed dynamically
      name: name       // Name should be passed dynamically
    };

    return this.http.post<string>(`${this.apiUrl}/create-checkout-session`, payload);
  }
}
