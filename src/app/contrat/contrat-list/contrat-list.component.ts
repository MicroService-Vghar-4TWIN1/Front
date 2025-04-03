import { Router } from '@angular/router';
import { ContratService } from './../../service/contrat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrat-list',
  templateUrl: './contrat-list.component.html',
  styleUrls: ['./contrat-list.component.css']
})
export class ContratListComponent implements OnInit {
  contrats: any[] = [];
  filteredContrats: any[] = [];
  activeContratsCount: number = 0;
  archivedContratsCount: number = 0;

  constructor(private contratService: ContratService, private router: Router) { }

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats(): void {
    this.contratService.getContrats().subscribe((data) => {
      this.contrats = data;
      this.filteredContrats = [...this.contrats];
      this.updateStats();
    });
  }

  updateStats(): void {
    this.activeContratsCount = this.contrats.filter(c => !c.archive).length;
    this.archivedContratsCount = this.contrats.filter(c => c.archive).length;
  }

  filterContrats(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredContrats = this.contrats.filter(contrat =>
      contrat.specialite.toLowerCase().includes(query) ||
      contrat.idContrat.toString().includes(query)
    );
  }

  sortTable(column: keyof any) {
    this.filteredContrats.sort((a: any, b: any) => (a[column] > b[column] ? 1 : -1));
  }

  deleteContrat(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce contrat ?")) {
      this.contratService.deleteContrat(id).subscribe(() => {
        this.loadContrats();
      });
    }
  }



  viewHistorique(contratId: number): void {
    this.router.navigate(['/contrats/historique', contratId]);
  }

}

