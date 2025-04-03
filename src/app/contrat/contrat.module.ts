import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratListComponent } from './contrat-list/contrat-list.component';
import {HttpClientModule} from "@angular/common/http";
import { ContratRoutingModule } from './contrat-routing.modules';
import { AddContratComponent } from './add-contrat/add-contrat.component';
import { FormsModule } from '@angular/forms';
import { UpdateContratComponent } from './update-contrat/update-contrat.component';
import { HistoriqueContratComponent } from './historique-contrat/historique-contrat.component';


@NgModule({
  declarations: [
    ContratListComponent,
    AddContratComponent,
    UpdateContratComponent,
    HistoriqueContratComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ContratRoutingModule
  ]
})
export class ContratModule { }
