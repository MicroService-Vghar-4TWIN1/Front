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
  studentId = '';
  amountRequested: number | null = null;
  reason = '';
  status = 'pending';
  dateSubmitted: string = '';
  dateReviewed: string = '';

  constructor(
    private financeService: FinancialAidService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.financeId = this.route.snapshot.paramMap.get('id') as string;
    this.financeService.getById(this.financeId).subscribe(data => {
      this.amountRequested = data.amountRequested;
      this.reason = data.reason;
     
    });
  }

  onSubmit() {
    if (this.studentId && this.reason && this.amountRequested !== null && this.status && this.dateSubmitted) {
      const payload: Partial<FinancialAidRequest> = {
        reason: this.reason,
        amountRequested: this.amountRequested,
        
      };
      this.financeService.update(this.financeId, payload).subscribe({
        next: () => this.router.navigate(['/finance']),
        error: err => alert('Erreur lors de la mise à jour: ' + (err.error?.message || err.statusText))
      });
    }
  }
}
