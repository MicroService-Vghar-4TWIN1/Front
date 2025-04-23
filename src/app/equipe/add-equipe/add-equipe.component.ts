import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipeService, Niveau } from '../equipe.service';

@Component({
  selector: 'app-add-equipe',
  templateUrl: './add-equipe.component.html'
})
export class AddEquipeComponent implements OnInit {
  equipeForm!: FormGroup;  // ✅ This fixes the error
  niveaux = Object.values(Niveau);

  constructor(
    private fb: FormBuilder,
    private equipeService: EquipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.equipeForm = this.fb.group({
      nomEquipe: ['', Validators.required],
      niveau: ['', Validators.required],
      detailEquipeId: [0, Validators.required],
      nbMembres: [0, Validators.required],
      ageMoyen: [0, Validators.required],
      projetsLivres: [0, Validators.required]
    });
    
  }

  onSubmit(): void {
    if (this.equipeForm.valid) {
      this.equipeService.add(this.equipeForm.value).subscribe(() => {
        this.router.navigate(['/equipe/list']); // List will call getEquipes()
      });
    }
  }
  

  cancel(): void {
    this.router.navigate(['/equipe/list']);
  }
}
