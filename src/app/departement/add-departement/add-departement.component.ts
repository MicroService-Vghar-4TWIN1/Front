import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/service/departement.service';
@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.css']
})
export class AddDepartementComponent {
  departementForm: FormGroup;
  universities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private departementService: DepartementService
  ) {
    this.departementForm = this.fb.group({
      nomDepart: ['', Validators.required],
      description: [''],
      code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      active: [true],
      idUniversite: ['', Validators.required]  

    });
  }
  ngOnInit(): void {
    this.getUniversities();
  }
  getUniversities() {
    this.http.get<any[]>('http://localhost:8090/universite/retrieve-all-universites')
      .subscribe(data => {
        this.universities = data;
      }, error => {
        console.error('Erreur lors du chargement des universités:', error);
      });
  }

  onSubmit(): void {
    if (this.departementForm.valid) {
      this.departementService.add(this.departementForm.value).subscribe({
        next: (response) => {
          console.log('Departement added successfully:', response);
          this.router.navigate(['/departement']); // Redirect to the list page after successful addition
        }
        , error: (error) => {
          console.error('Error adding departement:', error);
          // Handle error here, e.g., show a notification
        }
      });
    }
  }
}
