import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RessourceRoutingModule } from './ressource-routing.module';
import { RessourceListComponent } from './ressource-list/ressource-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RessourceAddComponent } from './ressource-add/ressource-add.component';
import { HttpClientModule } from '@angular/common/http';
import { RessourceUpdateComponent } from './ressource-update/ressource-update.component';
import { RessourceDetailComponent } from './ressource-detail/ressource-detail.component';

@NgModule({
  declarations: [
    RessourceListComponent,
    RessourceAddComponent,
    RessourceUpdateComponent,
    RessourceDetailComponent
  ],
  imports: [
    CommonModule,
    RessourceRoutingModule,
    FormsModule,
    ReactiveFormsModule
    ]
})
export class RessourceModule { }