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
allEquipes: Equipe[] = [];
chartType: ChartType = ChartType.PieChart;
  chartData: (string | number)[][] = [['Niveau', 'Nombre']];
  chartOptions = {
    title: 'Répartition des Équipes par Niveau',
    height: 400,
    hAxis: {
      title: 'Niveau',
    },
    vAxis: {
      title: 'Nombre d\'équipes'
    },
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
      this.allEquipes = [...data]; // ✅ Needed for filtering!
    });
  }
  

  deleteEquipe(id: number | undefined) {
    if (!id) return alert("ID introuvable !");
    this.equipeService.delete(id).subscribe(() => {
      this.getEquipes();
      this.filterEquipes();
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
      console.log('Stats:', stats); // ✅ Add this
  
      this.chartData = [['Niveau', 'Nombre']];
      Object.entries(stats).forEach(([niveau, count]) => {
        this.chartData.push([niveau, Number(count)]);
      });
    });
  }
  
  
  filterEquipes() {
    const term = this.searchTerm.toLowerCase();
    this.equipes = this.allEquipes.filter(e =>
      e.nomEquipe.toLowerCase().includes(term) ||
      e.niveau.toString().toLowerCase().includes(term)
    );
  }

  exportPDF(): void {
    const doc = new jsPDF();
  
    const logoImg = new Image();
    logoImg.src = 'assets/logo.jpg'; // 🖼 Path to your logo image
  
    logoImg.onload = () => {
      // 🖼 Logo
      doc.addImage(logoImg, 'PNG', 15, 10, 30, 30);
  
      // 🏫 Title
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('Université XYZ', 55, 20);
      doc.setFontSize(14);
      doc.text('Liste des Équipes - Rapport Officiel', 55, 30);
  
      // 📅 Date
      const today = new Date();
      const dateStr = today.toLocaleDateString();
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Date d'export: ${dateStr}`, 160, 10);
  
      // 📊 Table
      const tableData = this.equipes.map((e, index) => [
        index + 1,
        e.nomEquipe,
        e.niveau
      ]);
  
      autoTable(doc, {
        head: [['#', 'Nom de l\'équipe', 'Niveau']],
        body: tableData,
        startY: 45,
        theme: 'striped',
        styles: {
          halign: 'center',
          fontSize: 10,
        },
        headStyles: {
          fillColor: [30, 42, 58],
          textColor: [255, 255, 255],
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        }
      });
  
      // 📌 Footer
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
    
  }}
