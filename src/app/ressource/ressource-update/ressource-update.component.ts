import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService, Ressource, Type } from '../../service/ressource.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContratService } from '../../service/contrat.service'; // Importez le service Contrat

@Component({
  selector: 'app-ressource-update',
  templateUrl: './ressource-update.component.html',
  styleUrls: ['./ressource-update.component.css']
})
export class RessourceUpdateComponent implements OnInit {
  ressourceForm: FormGroup;
  contrats: any[] = []; // Ajoutez cette propriété

  ressource: Ressource = {
    idRessource: 0,
    titre: '',
    url: '',
    pdf: '',
    description: '',
    type: Type.E_Book,
    idContrat: 0
  };

  types = Object.values(Type);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ressourceService: RessourceService,
    private fb: FormBuilder
  ) {
    this.ressourceForm = this.fb.group({
      titre: ['', [Validators.required]],
      url: ['', [ Validators.pattern('https?://.+')]],
      description: ['', [Validators.required]],
      type: [Type.E_Book, [Validators.required]],
      idContrat: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    // Chargez la liste des contrats
    this.loadContrats();

    if (id) {
      this.ressourceService.getRessource(+id).subscribe(
        ressource => {
          this.ressource = ressource;
          this.ressourceForm.patchValue({
            titre: ressource.titre,
            url: ressource.url,
            description: ressource.description,
            type: ressource.type,
            idContrat: ressource.idContrat || 0
          });
        }
      );
    }
  }

  // Méthode pour charger les contrats
  loadContrats() {
    this.ressourceService.getAllContrats().subscribe({
      next: (data) => {
        this.contrats = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des contrats', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.ressource.pdf = file.name;
      this.ressourceForm.patchValue({ pdf: file });
    }
  }

  onSubmit(): void {
    if (this.ressourceForm.valid) {
      const updatedRessource: Ressource = {
        ...this.ressource,
        ...this.ressourceForm.value,
        idContrat: this.ressourceForm.value.idContrat
      };
      
      this.ressourceService.updateRessource(updatedRessource).subscribe({
        next: () => {
          this.router.navigate(['/ressources']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour:', err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/ressources']);
  }
}