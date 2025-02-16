import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratListComponent } from './contrat-list/contrat-list.component';
import {HttpClientModule} from "@angular/common/http";
import { ContratRoutingModule } from './contrat-routing.modules';



@NgModule({
  declarations: [
    ContratListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ContratRoutingModule
  ]
})
export class ContratModule { }
