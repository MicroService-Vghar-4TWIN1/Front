import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartementService } from 'src/app/service/departement.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDepartementComponent } from '../update-departement/update-departement.component';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export interface Departement {
  idDepart?: number;
  nomDepart: string;
  description?: string;
  code: string;
  createdDate: string;
  email: string;
  phone: string;
  active: boolean;
}

@Component({
  selector: 'app-list-departements',
  templateUrl: './list-departements.component.html',
  styleUrls: ['./list-departements.component.css']
})

export class ListDepartementsComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;
  displayedColumns: string[] = ['nomDepart', 'code', 'email', 'phone', 'createdDate', 'active', 'actions'];
  dataSource = new MatTableDataSource<Departement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog, private departementService: DepartementService) { }

  ngAfterViewInit(): void {
    this.createChart();
    this.fetchDepartements();
  }

  openEditDialog(element: any): void {
    const dialogRef = this.dialog.open(UpdateDepartementComponent, {
      width: '500px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchDepartements(); // Reload the list
      }
    });
  }

  fetchDepartements() {
    this.departementService.getAll()
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // After fetching departements, calculate the stats and update chart
        this.calculateDepartementStats(data);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteDepartement(id: number) {
    if (confirm('Are you sure you want to delete this departement?')) {
      this.departementService.delete(id).subscribe(() => {
        this.fetchDepartements();
      });
    }
  }

  redirectToAdd() {
    this.router.navigate(['/departement/add']);
  }

  createChart() {
    if (this.chartCanvas) {
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Departements créés par mois',
              data: [],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  calculateDepartementStats(departements: Departement[]) {
    const monthCount: { [key: string]: number } = {};

    departements.forEach(departement => {
      const monthYear = new Date(departement.createdDate).toLocaleString('default', { year: 'numeric', month: '2-digit' });
      if (!monthCount[monthYear]) {
        monthCount[monthYear] = 0;
      }

      monthCount[monthYear] += 1;
    });

    const labels = Object.keys(monthCount);
    const data = Object.values(monthCount);

    this.updateChart(labels, data);
  }

  updateChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    }
  }
}
