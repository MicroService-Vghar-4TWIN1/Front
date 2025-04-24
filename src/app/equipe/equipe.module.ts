import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EquipeRoutingModule } from './equipe-routing.module';
import { ListEquipeComponent } from './list-equipe/list-equipe.component';
import { AddEquipeComponent } from './add-equipe/add-equipe.component';
import { EditEquipeComponent } from './edit-equipe/edit-equipe.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    ListEquipeComponent,
    AddEquipeComponent,
    EditEquipeComponent
  ],
  imports: [
    GoogleChartsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EquipeRoutingModule
  ]
})
export class EquipeModule { }