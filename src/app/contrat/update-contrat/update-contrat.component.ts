import { ActivatedRoute, Router } from '@angular/router';
import { ContratService } from './../../service/contrat.service';
import { Component, OnInit } from '@angular/core';
import { Contrat } from 'src/app/model/Contrat';

@Component({
  selector: 'app-update-contrat',
  templateUrl: './update-contrat.component.html',
  styleUrls: ['./update-contrat.component.css']
})
export class UpdateContratComponent implements OnInit {
  contrat: Contrat = {
    nom: '',
    idContrat: 0,
    dateDebutContrat: '',
    dateFinContrat: '',
    specialite: '',
    archive: false,
    montantContrat: 0
  };

  specialites = ['IA', 'RESEAUX', 'CLOUD', 'SECURITE'];

  constructor(
    private ContratService: ContratService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ContratService.getContratById(id).subscribe((data) => {
      this.contrat = data;
    });
  }

  update(): void {
    this.ContratService.updateContrat(this.contrat).subscribe(() => {
      this.router.navigate(['/contrats/liste']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/contrats/liste']);
  }
}
