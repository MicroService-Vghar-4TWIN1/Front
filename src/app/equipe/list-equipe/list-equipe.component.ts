import { Component, OnInit } from '@angular/core';
import { EquipeService, Equipe } from '../equipe.service';
import { ChartType } from 'angular-google-charts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-list-equipe',
  templateUrl: './list-equipe.component.html'
})
export class ListEquipeComponent implements OnInit {
  equipes: Equipe[] = [];
  searchTerm = '';
  chartType: ChartType = ChartType.BarChart;

  chartData: any[] = []; // will be populated in loadStats()
  
  chartOptions = {
    title: 'Répartition des Équipes par Niveau',
    height: 400,
    legend: { position: 'none' },
    hAxis: {
      title: 'Nombre d\'équipes',
      minValue: 0
    },
    vAxis: {
      title: 'Niveau'
    },
    bars: 'horizontal',
    colors: ['#1e88e5']
  };
  


  constructor(private equipeService: EquipeService) {}

  ngOnInit(): void {
    this.getEquipes();
    this.loadStats();
  }

  getEquipes() {
    this.equipeService.getAll().subscribe(data => {
      this.equipes = [...data];
    });
  }

  searchEquipes() {
    const term = this.searchTerm.trim();
    if (term === '') {
      this.getEquipes(); // reset
    } else {
      this.equipeService.search(term).subscribe(data => {
        this.equipes = data;
      });
    }
  }

  deleteEquipe(id: number | undefined) {
    if (!id) return alert("ID introuvable !");
    this.equipeService.delete(id).subscribe(() => {
      this.getEquipes();
    });
  }

  evolveEquipes() {
    this.equipeService.evolve().subscribe(() => {
      alert("Équipes évoluées avec succès !");
      this.getEquipes();
      this.loadStats();
    });
  }

  loadStats() {
    this.equipeService.getStats().subscribe(stats => {
      this.chartData = Object.entries(stats).map(([niveau, count]) => [niveau, Number(count)]);
    });
  }
  

  exportPDF(): void {
    const doc = new jsPDF();
    const logoImg = new Image();
    logoImg.src = 'assets/logo.jpg';

    logoImg.onload = () => {
      doc.addImage(logoImg, 'PNG', 15, 10, 30, 30);
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('Université XYZ', 55, 20);
      doc.setFontSize(14);
      doc.text('Liste des Équipes - Rapport Officiel', 55, 30);
      const dateStr = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Date d'export: ${dateStr}`, 160, 10);

      const tableData = this.equipes.map((e, i) => [
        i + 1,
        e.nomEquipe,
        e.niveau
      ]);

      autoTable(doc, {
        head: [['#', 'Nom de l\'équipe', 'Niveau']],
        body: tableData,
        startY: 45,
        theme: 'striped',
        styles: { halign: 'center', fontSize: 10 },
        headStyles: { fillColor: [30, 42, 58], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });

      const finalY = (doc as any).lastAutoTable.finalY || 60;
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text('Ce rapport a été généré automatiquement depuis le système Kassil.', 15, finalY + 10);
      doc.save('rapport_equipes.pdf');
    };
  }

  predictEquipe(equipe: Equipe) {
    this.equipeService.predict(equipe).subscribe(result => {
      equipe.prochaineEvolution = result.prochaineEvolution;
      alert(`Équipe "${equipe.nomEquipe}" est-elle proche d'évoluer ? ${result.prochaineEvolution ? '✅ OUI' : '❌ NON'}`);
    });
  }
}
