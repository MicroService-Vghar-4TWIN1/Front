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
  types: string[] = ['E_BOOK', 'COURS', 'ARTICLE']; // Ajout des types

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
      const formData = new FormData();
      
      // Append all fields including null checks
      formData.append('titre', this.ressourceForm.get('titre')?.value || '');
      formData.append('url', this.ressourceForm.get('url')?.value || '');
      formData.append('description', this.ressourceForm.get('description')?.value || '');
      
      // Ensure type is properly set
      const typeValue = this.ressourceForm.get('type')?.value;
      if (!typeValue) {
        console.error('Type is required');
        return;
      }
      formData.append('type', typeValue);
  
      // Handle PDF file
      if (this.pdfFile) {
        formData.append('pdfFile', this.pdfFile);
      }
  
      // Debug: Log FormData contents
      formData.forEach((value, key) => {
        console.log(key, value);
      });
  
      this.ressourceService.addRessource(formData).subscribe({
        next: (response) => {
          console.log('Ressource ajoutée avec succès', response);
          this.router.navigate(['/ressources']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout', error);
          if (error.error) {
            console.error('Server error details:', error.error);
          }
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
