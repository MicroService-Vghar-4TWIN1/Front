import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniversiteService } from '../../service/universite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-universite-add',
  templateUrl: './universite-add.component.html',
  styleUrls: ['./universite-add.component.css']
})
export class UniversiteAddComponent {
  universiteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private universiteService: UniversiteService,
    private router: Router
  ) {
    this.universiteForm = this.fb.group({
      nomUniv: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.universiteForm.valid) {
      const universiteData = this.universiteForm.value;
      this.universiteService.add(universiteData).subscribe({
        next: (response) => {
          console.log('Université ajoutée avec succès :', response);
          this.router.navigate(['/universite']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'université:', error);
          alert('Une erreur est survenue.');
        }
      });
    } else {
      this.markFormGroupTouched(this.universiteForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  cancel(): void {
    this.router.navigate(['/universite']);
  }
}
