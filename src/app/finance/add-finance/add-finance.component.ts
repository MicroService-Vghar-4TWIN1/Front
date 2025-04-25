import { Component, OnInit } from '@angular/core';
import { FinancialAidService, FinancialAidRequest } from '../../service/financial-aid.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/service/keyclock.service';

@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.css']
})
export class AddFinanceComponent implements OnInit{
  amountRequested: number = 0;
  reason: string = '';
  departments: any[] = [];
  departmentId!: number;

  constructor(
    private financeService: FinancialAidService, 
    private router: Router,
    private keycloakService: KeycloakService 
  ) {}
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
    if (this.amountRequested === null || this.reason.trim() === '' && this.departmentId !== null) {
      alert('Please fill all required fields');
      return;
    }
  
    this.keycloakService.updateToken(30).then(() => {
      const payload: FinancialAidRequest = {
        amountRequested: this.amountRequested,
        reason: this.reason,
        departmentId: this.departmentId
      };
      
  
      this.financeService.add(payload).subscribe({
        next: (response) => {
          console.log('Success!', response);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error:', err);
          alert(`Error: ${err.message}`);
        },
        complete: () => console.log('Request completed')
      });
    }).catch(err => {
      console.error('Token refresh failed:', err);
      this.keycloakService.login();
    });
  }
}