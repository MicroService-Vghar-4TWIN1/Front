import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RessourceService, Type } from '../../service/ressource.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ressource-add',
  templateUrl: './ressource-add.component.html',
  styleUrls: ['./ressource-add.component.css']
})
export class RessourceAddComponent {
  ressourceForm: FormGroup;
  types = Object.values(Type);
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private ressourceService: RessourceService,
    private router: Router
  ) {
    this.ressourceForm = this.fb.group({
      titre: ['', Validators.required],
      url: ['', Validators.pattern('https?://.+')],
      pdf: [''],
      description: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      alert('Veuillez sélectionner un fichier PDF valide.');
    }
  }

  onSubmit(): void {
    if (this.ressourceForm.valid) {
      const formData = new FormData();
      const ressourceData = this.ressourceForm.value;

      // Ajouter les champs du formulaire
      formData.append('titre', ressourceData.titre);
      formData.append('url', ressourceData.url);
      formData.append('description', ressourceData.description);
      formData.append('type', ressourceData.type);

      // Ajouter le fichier PDF s'il existe
      if (this.selectedFile) {
        formData.append('pdf', this.selectedFile, this.selectedFile.name);
      }

      this.ressourceService.addRessource(ressourceData).subscribe({
        next: (response) => {
          console.log('Ressource ajoutée avec succès:', response);
          this.router.navigate(['/ressources']); // Redirection après succès
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la ressource:', error);
          alert('Une erreur est survenue lors de l\'ajout de la ressource.');
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.markFormGroupTouched(this.ressourceForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  cancel(): void {
    this.router.navigate(['/ressources']);
  }
}