import { Component, OnInit } from '@angular/core';
import { RessourceService, Type, Ressource } from '../../service/ressource.service';
import { Router } from '@angular/router';

declare var google: any;

// Interface étendue pour inclure les propriétés nécessaires
interface RessourceWithContrat extends Ressource {
  idContrat?: number;
  contratNom?: string;
}

@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.css']
})
export class RessourceListComponent implements OnInit {
  ressources: RessourceWithContrat[] = [];
  formVisible: boolean = false;
  editMode: boolean = false;
  types = Object.values(Type);
  stats: Map<string, number> = new Map();

  constructor(private ressourceService: RessourceService, private router: Router) {}

  ngOnInit() {
    this.loadRessources();
    this.loadStats();
  }

  loadRessources() {
    this.ressourceService.getRessources().subscribe({
      next: (data) => {
        this.ressources = data.map(ressource => ({
          ...ressource,
          idContrat: ressource.idContrat, // Assure la présence de idContrat
          contratNom: ressource.idContrat ? `Contrat-${ressource.idContrat}` : 'N/A'
        }));
      },
      error: (err) => console.error('Erreur lors du chargement des ressources', err)
    });
  }

  loadStats() {
    this.ressourceService.getStats().subscribe({
      next: (data) => {
        this.stats = new Map(Object.entries(data));
        this.drawChart();
      },
      error: (err) => console.error('Erreur lors du chargement des statistiques', err)
    });
  }

  deleteRessource(id: number | undefined) {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      this.ressourceService.deleteRessource(id).subscribe({
        next: () => {
          this.ressources = this.ressources.filter(r => r.idRessource !== id);
          this.loadStats();
        },
        error: (err) => console.error('Erreur lors de la suppression de la ressource', err)
      });
    }
  }

  drawChart(): void {
    if (typeof google === 'undefined' || !google.charts) {
      console.error('Google Charts not loaded');
      return;
    }

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      const filteredStats = new Map<string, number>();
      this.stats.forEach((value, key) => {
        if (value > 0) {
          filteredStats.set(key, value);
        }
      });

      const chartElement = document.getElementById('piechart_3d');
      if (!chartElement) {
        console.error('Element piechart_3d not found');
        return;
      }

      if (filteredStats.size === 0) {
        chartElement.innerHTML = 
          '<div class="alert alert-info">Aucune donnée statistique disponible</div>';
        return;
      }

      const dataArray: Array<[string, string | number]> = [['Type', 'Nombre']];
      filteredStats.forEach((value, key) => {
        dataArray.push([key, value]);
      });

      const data = google.visualization.arrayToDataTable(dataArray);

      const options = {
        title: 'Répartition des Ressources par Type',
        titleTextStyle: {
          color: '#2c3e50',
          fontSize: 20,
          bold: true
        },
        is3D: true,
        width: 1000,
        height: 500,
        backgroundColor: '#f8f9fa',
        colors: ['#3498db', '#e74c3c', '#2ecc71'],
        legend: {
          position: 'labeled',
          textStyle: {
            color: '#34495e',
            fontSize: 14,
            bold: true
          }
        },
        chartArea: {
          width: '90%',
          height: '80%'
        },
        pieSliceText: 'value-and-percentage',
        pieSliceTextStyle: {
          color: 'white',
          fontSize: 14,
          bold: true
        },
        pieHole: 0.3,
        tooltip: {
          text: 'percentage',
          showColorCode: true
        },
        slices: this.createSliceSelection(filteredStats),
        animation: {
          duration: 1000,
          easing: 'out',
          startup: true
        }
      };

      try {
        const chart = new google.visualization.PieChart(chartElement);
        chart.draw(data, options);
      } catch (error) {
        console.error('Erreur de rendu du graphique:', error);
        chartElement.innerHTML = 
          '<div class="alert alert-danger">Erreur d\'affichage du graphique</div>';
      }
    });
  }

  private createSliceSelection(stats: Map<string, number>): { [key: number]: { offset: number } } {
    const slices: { [key: number]: { offset: number } } = {};
    let maxValue = 0;
    let maxIndex = 0;
    let currentIndex = 0;
    
    stats.forEach((value) => {
      if (value > maxValue) {
        maxValue = value;
        maxIndex = currentIndex;
      }
      currentIndex++;
    });

    slices[maxIndex] = { offset: 0.1 };
    return slices;
  }
}