import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipeService, Niveau } from '../equipe.service';

@Component({
  selector: 'app-edit-equipe',
  templateUrl: './edit-equipe.component.html'
})
export class EditEquipeComponent implements OnInit {
  equipeForm!: FormGroup;
  niveaux = Object.values(Niveau);
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private equipeService: EquipeService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.equipeForm = this.fb.group({
      idEquipe: [''],
      nomEquipe: ['', Validators.required],
      niveau: ['', Validators.required],
      detailEquipeId: [0, Validators.required],
      nbMembres: [0, Validators.required],
      ageMoyen: [0, Validators.required],
      projetsLivres: [0, Validators.required]
    });

    this.equipeService.getOne(this.id).subscribe(data => {
      this.equipeForm.patchValue(data);
    });
  }

  onUpdate(): void {
    if (this.equipeForm.valid) {
      this.equipeService.update(this.equipeForm.value).subscribe(() => {
        this.router.navigate(['/equipe/list']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/equipe/list']);
  }
}
