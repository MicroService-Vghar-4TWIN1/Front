import { Component } from '@angular/core';
import { FinancialAidService, FinancialAidRequest } from '../../service/financial-aid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.css']
})
export class AddFinanceComponent {
  amountRequested: number | null = null;
  reason: string = '';

  constructor(private financeService: FinancialAidService, private router: Router) {}

  onSubmit() {
    if (this.amountRequested !== null && this.reason.trim() !== '') {
      const payload: Partial<FinancialAidRequest> = {
        amountRequested: this.amountRequested,
        reason: this.reason
        // status, dateSubmitted, and dateReviewed are set on the backend
      };
      this.financeService.add(payload).subscribe({
        next: () => this.router.navigate(['/finance']),
        error: err => alert('Erreur lors de la soumission: ' + (err.error?.message || err.statusText))
      });
    }
  }
}
