import { Component, OnInit } from '@angular/core';
import { UniversiteService, Universite } from '../../service/universite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-universite-list',
  templateUrl: './universite-list.component.html',
  styleUrls: ['./universite-list.component.css']
})
export class UniversiteListComponent implements OnInit {
  universites: Universite[] = [];

  constructor(
    private universiteService: UniversiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUniversites();
  }

  loadUniversites(): void {
    this.universiteService.getAll().subscribe({
      next: (data) => (this.universites = data),
      error: (err) => console.error('Erreur de chargement des universités', err),
    });
  }

  deleteUniversite(id: number | undefined): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette université ?')) {
      this.universiteService.delete(id).subscribe({
        next: () => {
          this.universites = this.universites.filter(u => u.idUniv !== id);
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }


openMap(idUniv: number | undefined): void {
  if (!idUniv) return;

  this.universiteService.getMapLink(idUniv).subscribe({

    next: (url) => {
     if (url && typeof url === 'string' && url.includes("maps?q=")) {
  window.open(url, '_blank');
} else {
  alert("Les coordonnées de localisation ne sont pas disponibles pour cette université.");
}

    },
    error: (err) => {
      console.error('Erreur lors de la récupération du lien de la carte:', err);
      alert("Impossible d'accéder à la carte pour cette université.");
    }
  });
}

}
