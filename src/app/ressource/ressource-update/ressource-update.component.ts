import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService, Ressource, Type } from '../../service/ressource.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ressource-update',
  templateUrl: './ressource-update.component.html',
  styleUrls: ['./ressource-update.component.css']
})
export class RessourceUpdateComponent implements OnInit {
  ressourceForm: FormGroup;
  ressource: any = {
    titre: '',
    url: '',
    description: '',
    type: '',
    pdf: null
  };
  types = ['E_Book', 'Cours', 'Article'];
  pdfFile?: File ;
  showNewPdfField = false;
  currentPdfUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ressourceService: RessourceService
  ) {
    this.ressourceForm = this.fb.group({
      titre: ['', Validators.required],
      url: ['', Validators.pattern('https?://.+')],
      description: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ressourceService.getRessource(+id).subscribe(
        (data) => {
          this.ressource = data;
          this.ressourceForm.patchValue({
            titre: this.ressource.titre,
            url: this.ressource.url,
            description: this.ressource.description,
            type: this.ressource.type
          });
          
          if (this.ressource.pdf) {
            this.currentPdfUrl = `http://localhost:8080/upload-dir/${this.ressource.pdf}`;
          }
        },
        (error) => {
          console.error('Erreur lors du chargement', error);
        }
      );
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.pdfFile = event.target.files[0];
    }
  }

  removeCurrentPdf() {
    this.ressource.pdf = null;
    this.currentPdfUrl = null;
    this.showNewPdfField = true;
  }

  cancel() {
    this.router.navigate(['/ressources']);
  }

  submitForm() {
    if (this.ressourceForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        const formData = {
          ...this.ressourceForm.value,
          pdf: this.ressource.pdf ? 'keep' : null
        };
        
        this.ressourceService.updateRessource(
          +id,
          formData,
          this.pdfFile,
          !!this.ressource.pdf && !this.pdfFile
        ).subscribe(
          (response) => {
            console.log('Ressource mise à jour avec succès', response);
            this.router.navigate(['/ressources']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour', error);
          }
        );
      }
    }
  }
}
