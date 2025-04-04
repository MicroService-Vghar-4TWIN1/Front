import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService, Ressource, Type } from '../../service/ressource.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ressource-update',
  templateUrl: './ressource-update.component.html',
  styleUrls: ['./ressource-update.component.css']
})
export class RessourceUpdateComponent implements OnInit {
  ressourceForm: FormGroup;

  ressource: Ressource = {
    idRessource: 0,
    titre: '',
    url: '',
    pdf: '',
    description: '',
    type: Type.E_Book // Valeur par défaut valide
  };

  types = Object.values(Type);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ressourceService: RessourceService,
    private fb: FormBuilder
  ) {
    this.ressourceForm = this.fb.group({
      titre: [this.ressource.titre, [Validators.required]],
      url: [this.ressource.url, [Validators.required, Validators.pattern('https?://.+')]],
      description: [this.ressource.description, [Validators.required]],
      type: [this.ressource.type, [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ressourceService.getRessource(+id).subscribe(
        ressource => {
          this.ressource = ressource;
          this.ressourceForm.patchValue(ressource);
        }
      );
    }
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.ressource.pdf = file.name;  // Stocke juste le nom du fichier (si nécessaire)
      this.ressourceForm.patchValue({ pdf: file });  // Ajoute le fichier au formulaire
      console.log("File selected:", file);
    }
  }
  

  onSubmit(): void {
    if (this.ressourceForm.valid) {
      const updatedRessource = { ...this.ressourceForm.value, idRessource: this.ressource.idRessource };
        this.ressourceService.updateRessource(updatedRessource).subscribe(() => {
        this.router.navigate(['/ressources']);
      });
    }
  }
  

  cancel(): void {
    this.router.navigate(['/ressources']);
  }
}
