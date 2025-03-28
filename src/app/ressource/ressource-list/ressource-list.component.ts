import { Component, OnInit } from '@angular/core';
import { RessourceService, Type, Ressource } from '../../service/ressource.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.css']
})
export class RessourceListComponent implements OnInit {
  ressources: Ressource[] = [];
  formVisible: boolean = false;
  editMode: boolean = false;
  types = Object.values(Type);
  stats: Map<string, number> = new Map();

  currentRessource: Ressource = {
    titre: '',
    url: '',
    pdf: '',
    description: '',
    type: Type.Cours
  };

  constructor(private ressourceService: RessourceService, private router: Router) {}

  ngOnInit() {
    this.loadRessources();
    this.loadStats();
  }

  loadRessources() {
    this.ressourceService.getRessources().subscribe({
      next: (data) => this.ressources = data,
      error: (err) => console.error('Erreur lors du chargement des ressources', err)
    });
  }

  loadStats() {
    this.ressourceService.getStats().subscribe({
      next: (data) => this.stats = new Map(Object.entries(data)),
      error: (err) => console.error('Erreur lors du chargement des statistiques', err)
    });
  }

  deleteRessource(id: number | undefined) {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      this.ressourceService.deleteRessource(id).subscribe({
        next: () => {
          this.ressources = this.ressources.filter(r => r.idRessource !== id);
          this.loadStats();
        },
        error: (err) => console.error('Erreur lors de la suppression de la ressource', err)
      });
    }
  }

 
}
