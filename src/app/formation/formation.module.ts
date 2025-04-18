import { FullCalendarModule } from '@fullcalendar/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationAddComponent } from './formation-add/formation-add.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormationRoutingModule } from './formation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { FormationEditComponent } from './formation-edit/formation-edit.component';

@NgModule({
  declarations: [
    FormationAddComponent,
    CalendarComponent,
    FormationDetailComponent,
   FormationEditComponent
  ],
  imports: [
    CommonModule,
    FormationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    RouterModule
  ]
})
export class FormationModule { }
