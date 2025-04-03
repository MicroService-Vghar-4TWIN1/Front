import { Router } from '@angular/router';
import { ContratService } from '../../service/contrat.service';
import { Component } from '@angular/core';
import { Contrat } from '../../model/Contrat';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrls: ['./add-contrat.component.css']
})
export class AddContratComponent {
  newContrat: Contrat = {
    nom: '',
    dateDebutContrat: '',
    dateFinContrat: '',
    specialite: 'IA',
    archive: false,
    montantContrat: 0
  };

  specialites = ['IA', 'RESEAUX', 'CLOUD', 'SECURITE'];
  isSubmitting = false;

  constructor(
    private contratService: ContratService,
    private router: Router
  ) { }

  save(): void {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    const contratToSend: Contrat = {
      ...this.newContrat,
      dateDebutContrat: new Date(this.newContrat.dateDebutContrat),
      dateFinContrat: new Date(this.newContrat.dateFinContrat)
    };

    this.contratService.addContrat(contratToSend).subscribe({
      next: () => {
        this.router.navigate(['/contrats/liste']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du contrat', err);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  resetForm(): void {
    this.newContrat = {
      nom: '',
      dateDebutContrat: '',
      dateFinContrat: '',
      specialite: 'IA',
      archive: false,
      montantContrat: 0
    };
  }

  onCancel(): void {
    this.router.navigate(['/contrats/liste']);
  }
}