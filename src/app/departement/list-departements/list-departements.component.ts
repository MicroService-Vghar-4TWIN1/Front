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
import { forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap, toArray } from 'rxjs/operators';

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
  universiteName?: string;
  idUniversite: number;
}

@Component({
  selector: 'app-list-departements',
  templateUrl: './list-departements.component.html',
  styleUrls: ['./list-departements.component.css']
})
export class ListDepartementsComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;
  universityName: string = '';

  displayedColumns: string[] = ['nomDepart', 'code', 'email', 'phone', 'université', 'createdDate', 'active', 'actions'];
  dataSource = new MatTableDataSource<Departement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private departementService: DepartementService
  ) {}

  ngAfterViewInit(): void {
    this.createChart();
    this.fetchDepartements();
  }

  openEditDialog(element: Departement): void {
    const dialogRef = this.dialog.open(UpdateDepartementComponent, {
      width: '500px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchDepartements();
      }
    });
  }

  fetchDepartements(): void {
    this.departementService.getAll().pipe(
      mergeMap(departements =>
        forkJoin(
          departements.map(departement =>
            this.departementService.getUniversityById(departement.idUniversite).pipe(
              map(univ => ({
                ...departement,
                universiteName: univ.nomUniv
              })),
              catchError(error => {
                console.error('Failed to fetch university:', error);
                return of({
                  ...departement,
                  universiteName: 'Université inconnue'
                });
              })
            )
          )
        )
      )
    ).subscribe(updatedDepartements => {
      this.dataSource.data = updatedDepartements;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.calculateDepartementStats(updatedDepartements);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteDepartement(id: number): void {
    if (confirm('Are you sure you want to delete this departement?')) {
      this.departementService.delete(id).subscribe(() => {
        this.fetchDepartements();
      });
    }
  }

  redirectToAdd(): void {
    this.router.navigate(['/departement/add']);
  }

  createChart(): void {
    if (this.chartCanvas) {
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Départements par Université',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
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

  calculateDepartementStats(departements: Departement[]): void {
    const universityCount: { [key: string]: number } = {};

    departements.forEach(departement => {
      const universityName = departement.universiteName || 'Université inconnue';
      universityCount[universityName] = (universityCount[universityName] || 0) + 1;
    });

    const labels = Object.keys(universityCount);
    const data = Object.values(universityCount);

    this.updateChart(labels, data);
  }

  updateChart(labels: string[], data: number[]): void {
    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    }
  }
}
