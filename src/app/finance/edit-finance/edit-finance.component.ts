import { Component, OnInit } from '@angular/core';
import { FinancialAidService, FinancialAidRequest } from '../../service/financial-aid.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-finance',
  templateUrl: './edit-finance.component.html',
  styleUrls: ['./edit-finance.component.css']
})
export class EditFinanceComponent implements OnInit {
  financeId = '';
  nomProjet = '';
  montant: number | null = null;
  description = '';
  studentId = '';

  constructor(
    private financeService: FinancialAidService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.financeId = this.route.snapshot.paramMap.get('id') as string;
    this.financeService.getById(this.financeId).subscribe(data => {
      this.nomProjet = data.reason;
      this.montant = data.amountRequested;
      this.description = data.reason; // Only "reason" exists - you can also use "description" if you added it
      this.studentId = data.studentId || '';
    });
  }

  onSubmit() {
    if (this.nomProjet && this.montant !== null && this.description) {
      const payload: Partial<FinancialAidRequest> = {
        reason: this.nomProjet,
        amountRequested: this.montant,
        studentId: this.studentId
      };
      this.financeService.update(this.financeId, payload).subscribe({
        next: () => this.router.navigate(['/finance']),
        error: err => alert('Erreur lors de la mise à jour: ' + err.error?.message || err.statusText)
      });
    }
  }
}