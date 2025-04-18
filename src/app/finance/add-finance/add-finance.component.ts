import { Component } from '@angular/core';
import { FinancialAidService, FinancialAidRequest } from '../../service/financial-aid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.css']
})
export class AddFinanceComponent {
  nomProjet = '';
  montant: number | null = null;
  description = '';
  studentId = '';

  constructor(private financeService: FinancialAidService, private router: Router) {}

  onSubmit() {
    if (this.nomProjet && this.montant !== null && this.description) {
      const payload: Partial<FinancialAidRequest> = {
        reason: this.nomProjet,
        amountRequested: this.montant,
        studentId: this.studentId,
        // status, dateSubmitted, and dateReviewed will be set by backend
      };
      this.financeService.add(payload).subscribe({
        next: () => this.router.navigate(['/finance']),
        error: err => alert('Erreur lors de la soumission: ' + err.error?.message || err.statusText)
      });
    }
  }
}