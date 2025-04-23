import { Component, OnInit } from '@angular/core';
import { FinancialAidService, FinancialAidRequest } from '../../service/financial-aid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-finance',
  templateUrl: './list-finance.component.html',
  styleUrls: ['./list-finance.component.css']
})
export class ListFinanceComponent implements OnInit {
  requests: FinancialAidRequest[] = [];

  constructor(private financeService: FinancialAidService, private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.financeService.getAll().subscribe(data => this.requests = data);
  }

  accept(id: string) {
    this.financeService.updateStatus(id, 'approved').subscribe(() => this.loadData());
  }
  reject(id: string) {
    this.financeService.updateStatus(id, 'rejected').subscribe(() => this.loadData());
  }

  edit(id: string) {
    this.router.navigate(['/finance/update', id]);
  }
  delete(id: string) {
    if (confirm('Supprimer cette demande ?')) {
      this.financeService.delete(id).subscribe(() => this.loadData());
    }
  }
}