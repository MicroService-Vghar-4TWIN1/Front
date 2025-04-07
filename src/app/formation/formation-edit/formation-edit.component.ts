import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/service/formation.service';
@Component({
  selector: 'app-formation-edit',
  templateUrl: './formation-edit.component.html',
  styleUrls: ['./formation-edit.component.css']
})
export class FormationEditComponent implements OnInit{
  formationForm: FormGroup;
  formationId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    // Récupérer l'ID de la formation depuis l'URL
    this.formationId = Number(this.route.snapshot.paramMap.get('id'));

    // Si l'ID est valide, récupérer les données de la formation et les remplir dans le formulaire
    if (this.formationId) {
      this.formationService.getFormation(this.formationId).subscribe(formation => {
        this.formationForm.patchValue({
          nomFormation: formation.nomFormation,
          dateFormation: formation.dateFormation,
          description: formation.description,
          nombrePlace: formation.nombrePlace,
          prix: formation.prix
        });
      });
    } else {
      alert('Formation non trouvée.');
    }
  }

  isSubmitting = false;

  onSubmit(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    if (this.formationForm.valid && this.formationId) {
      const formationData = this.formationForm.value;
      this.formationService.updateFormation(this.formationId, formationData).subscribe({
        next: (response) => {
          console.log('Formation mise à jour avec succès:', response);
          this.router.navigate(['/formation',this.formationId]);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la formation:', error);
        }
      });
    } else {
      console.error('Le formulaire n\'est pas valide ou ID de formation manquant');
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