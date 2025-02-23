import { Component, OnInit } from '@angular/core';
import { RessourceService } from './../../service/ressource.service';

@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.css']
})
export class RessourceListComponent implements OnInit {
  ressources: any[] = [];
  formVisible: boolean = false; // Contrôle la visibilité du formulaire
  newRessource = {
    titre: '',
    url: '',
    format: '',
    type: ''
  };

  constructor(private ressourceService: RessourceService) {}

  ngOnInit() {
    // Chargement initial des ressources depuis le backend
    this.ressourceService.getRessources().subscribe(data => {
      this.ressources = data;
    });
  }

  // Méthode pour ajouter une ressource
  addRessource() {
    // Validation des champs nécessaires
    if (this.newRessource.titre && this.newRessource.url && this.newRessource.type) {
      this.ressourceService.addRessource(this.newRessource).subscribe((data) => {
        this.ressources.push(data); // Ajout de la ressource à la liste après ajout dans le backend
        this.resetForm(); // Réinitialiser le formulaire
      }, error => {
        console.error('Erreur lors de l\'ajout de la ressource', error);
      });
    } else {
      console.warn('Veuillez remplir tous les champs requis.');
    }
  }

  // Méthode pour réinitialiser le formulaire
  resetForm() {
    this.newRessource = { titre: '', url: '', format: '', type: '' };
    this.formVisible = false; // Cacher le formulaire après ajout
  }

  // Toggle la visibilité du formulaire d'ajout
  toggleForm() {
    this.formVisible = !this.formVisible;
  }

  // Méthode pour modifier une ressource
  editRessource(ressource: any) {
    console.log('Modifier ressource', ressource);
    // Logique de modification, peut-être réafficher le formulaire avec les valeurs actuelles
  }

  // Méthode pour supprimer une ressource
  deleteRessource(ressource: any) {
    const index = this.ressources.indexOf(ressource);
    if (index !== -1) {
      this.ressources.splice(index, 1);
      // Appel de l'API pour supprimer la ressource dans le backend
      this.ressourceService.deleteRessource(ressource.id).subscribe(() => {
        console.log('Ressource supprimée');
      }, error => {
        console.error('Erreur lors de la suppression de la ressource', error);
      });
    }
  }
}
