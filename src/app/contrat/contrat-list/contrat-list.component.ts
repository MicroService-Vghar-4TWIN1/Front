import { ContratService } from './../../service/contrat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrat-list',
  templateUrl: './contrat-list.component.html',
  styleUrls: ['./contrat-list.component.css']
})
export class ContratListComponent implements OnInit {

  contrats: any[] = [];

  constructor(private ContratService: ContratService) { }

  ngOnInit(): void {
    this.loadContrats();
  }

  // Fonction pour charger les contrats via le service
  loadContrats(): void {
    this.ContratService.getContrats().subscribe((data) => {
      this.contrats = data;
    });
  }
}
