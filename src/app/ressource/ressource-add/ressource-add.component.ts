import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RessourceService } from '../../service/ressource.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ressource-add',
  templateUrl: './ressource-add.component.html',
  styleUrls: ['./ressource-add.component.css']
})
export class RessourceAddComponent implements OnInit {
  ressourceForm: FormGroup;
  pdfFile?: File;
  types: string[] = ['E_Book', 'Cours', 'Article']; // Ajout des types

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

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.ressourceForm = this.fb.group({
      titre: ['', Validators.required],
      url: ['', Validators.pattern('https?://.+')],
      description: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.pdfFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.ressourceForm.valid) {
      const formData = {
        titre: this.ressourceForm.get('titre')?.value,
        url: this.ressourceForm.get('url')?.value,
        description: this.ressourceForm.get('description')?.value,
        type: this.ressourceForm.get('type')?.value
      };

      this.ressourceService.addRessource(formData, this.pdfFile)
        .subscribe(
          response => {
            console.log('Ressource ajoutée avec succès', response);
            this.router.navigate(['/ressources']);
          },
          error => {
            console.error('Erreur lors de l\'ajout', error);
          }
        );
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
