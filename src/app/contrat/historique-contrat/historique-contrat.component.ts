import { Component, OnInit } from '@angular/core';
import { ContratService } from './../../service/contrat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historique-contrat',
  templateUrl: './historique-contrat.component.html',
  styleUrls: ['./historique-contrat.component.css']
})
export class HistoriqueContratComponent implements OnInit {

  contratId!: number;
  historique: any[] = [];

  constructor(
    private contratService: ContratService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contratId = +params['id']; // Récupère l'ID du contrat depuis l'URL
      this.loadHistorique();
    });
  }

  loadHistorique(): void {
    this.contratService.getHistoriqueByContrat(this.contratId).subscribe(data => {
      this.historique = data;
    });
  }
}
