import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RessourceRoutingModule } from './ressource-routing.module';
import { RessourceListComponent } from './ressource-list/ressource-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RessourceListComponent
  ],
  imports: [
    CommonModule,
    RessourceRoutingModule,
    FormsModule
  ]
})
export class RessourceModule { }
