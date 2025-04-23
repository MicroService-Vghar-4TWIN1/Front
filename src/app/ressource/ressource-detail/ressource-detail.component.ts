import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RessourceService, Ressource } from '../../service/ressource.service';

@Component({
  selector: 'app-ressource-details',
  templateUrl: './ressource-detail.component.html',
  styleUrls: ['./ressource-detail.component.css']

})
export class RessourceDetailComponent implements OnInit {
  ressource?: Ressource;
  summary = '';
  id!: number;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la ressource à partir de l'URL
    this.id = +this.route.snapshot.paramMap.get('id')!;
    // Charger la ressource depuis le service
    this.ressourceService.getRessource(this.id).subscribe(res => this.ressource = res);
  }

  // Méthode pour obtenir le résumé de la ressource
  getSummary() {
    this.loading = true; // Indiquer que la demande est en cours
    this.ressourceService.getSummary(this.id).subscribe({
      next: (res) => {
        this.summary = res; // Mettre à jour le résumé avec la réponse
        this.loading = false; // Fin du chargement
      },
      error: (err) => {
        this.summary = 'Erreur lors du résumé.'; // En cas d'erreur
        this.loading = false; // Fin du chargement
      }
    });
  }
}
