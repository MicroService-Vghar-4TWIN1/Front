import { Component, OnInit } from '@angular/core';
import { FinancialAidService, FinancialAidRequest } from '../../service/financial-aid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.css']
})
export class AddFinanceComponent implements OnInit {
  amountRequested: number | null = null;
  reason: string = '';
  departmentId: number | null = null;

  departments: any[] = [];

  constructor(private financeService: FinancialAidService, private router: Router) {}

  ngOnInit(): void {
    this.financeService.getDepartments().subscribe({
      next: (response: any) => {
        
        console.log('Loaded departments:', response);
        this.departments = response;

      },
      error: err => {
        console.error('Erreur lors du chargement des départements:', err);
      }
    });
    console.log('departments array length:', this.departments.length);

  }

  onSubmit() {
    if (this.amountRequested !== null && this.reason.trim() !== '' && this.departmentId !== null) {
      const payload: Partial<FinancialAidRequest> = {
        amountRequested: this.amountRequested,
        reason: this.reason,
        departmentId: this.departmentId
      };

      this.financeService.add(payload).subscribe({
        next: () => this.router.navigate(['/finance']),
        error: err => alert('Erreur lors de la soumission: ' + (err.error?.message || err.statusText))
      });
    }
  }
}
