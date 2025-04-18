import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversiteListComponent } from './universite-list/universite-list.component';
import { UniversiteAddComponent } from './universite-add/universite-add.component';
import { UniversiteUpdateComponent } from './universite-update/universite-update.component';
import { UniversiteRoutingModule } from './universite-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UniversiteListComponent,
    UniversiteAddComponent,
    UniversiteUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UniversiteRoutingModule
  ]
})
export class UniversiteModule { }
