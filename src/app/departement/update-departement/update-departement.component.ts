import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DepartementService } from 'src/app/service/departement.service';
@Component({
  selector: 'app-update-departement',
  templateUrl: './update-departement.component.html',
  styleUrls: ['./update-departement.component.css']
})
export class UpdateDepartementComponent {
  departementForm: FormGroup;
  universities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private departementService: DepartementService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<UpdateDepartementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.departementForm = this.fb.group({
      idDepart: [data.idDepart],
      nomDepart: [data.nomDepart, Validators.required],
      description: [data.description],
      code: [data.code, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, Validators.required],
      active: [data.active],
      idUniversite: [data.idUniversite, Validators.required]
    });
  }
  ngOnInit(): void {
    this.getUniversities();
  }
  getUniversities() {
    this.http.get<any[]>('http://localhost:8090/universite/universite/retrieve-all-universites')
      .subscribe(data => {
        this.universities = data;
      }, error => {
        console.error('Erreur lors du chargement des universités:', error);
      });
  }

  onUpdate(id:any): void {
    this.departementService.update(this.departementForm.value,id)
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erreur de mise à jour :', err)
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
