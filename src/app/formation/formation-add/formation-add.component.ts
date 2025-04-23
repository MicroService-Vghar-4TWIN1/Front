import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormationService } from 'src/app/service/formation.service';

@Component({
  selector: 'app-formation-add',
  templateUrl: './formation-add.component.html',
  styleUrls: ['./formation-add.component.css']
})
export class FormationAddComponent {
  formationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formationService: FormationService
  ) {
    this.formationForm = this.fb.group({
      dateFormation: ['', Validators.required],
      description: ['', Validators.required],
      nomFormation: ['', Validators.required],
      nombrePlace: ['', Validators.required],
      prix: ['', Validators.required],
    });

    
  }
  isSubmitting = false;


  onSubmit(): void {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    if (this.formationForm.valid) {
      const formationData = this.formationForm.value;
      this.formationService.addFormation(formationData).subscribe({
        next: (response) => {
          console.log('Formation ajoutée avec succès:', response);
          this.router.navigate(['/formation']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la formation:', error);
        }
      });
    } else {
      console.error('Le formulaire n\'est pas valide');
      this.isSubmitting = false;
    }
  }

  onReset(): void {
    this.formationForm.reset();
    this.isSubmitting = false;
  }

  onCancel(): void {
    this.router.navigate(['/formation']);
    this.isSubmitting = false;
  }
  
}
