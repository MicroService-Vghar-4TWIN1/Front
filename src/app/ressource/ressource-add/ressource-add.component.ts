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
      const ressourceData = this.ressourceForm.value;
      const formData = new FormData();

      // Convertir l'objet ressource en JSON dans un Blob
      formData.append('ressource', new Blob([JSON.stringify(ressourceData)], {
        type: 'application/json'
      }));

      // Ajouter le fichier PDF s'il existe
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }

      // ✅ Envoyer le FormData (et non ressourceData simple)
      this.ressourceService.addRessource(formData).subscribe({
        next: (response) => {
          console.log('Ressource ajoutée avec succès:', response);
          this.router.navigate(['/ressources']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la ressource:', error);
          alert('Une erreur est survenue lors de l\'ajout de la ressource.');
        }
      });
    } else {
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
