import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationAddComponent } from './formation-add/formation-add.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { FormationEditComponent } from './formation-edit/formation-edit.component';

const routes: Routes = [

  {path: '', component: CalendarComponent}, 
  {path: 'add', component: FormationAddComponent},
  {path: ':id', component: FormationDetailComponent},
  {path: 'edit/:id', component: FormationEditComponent}, // Assuming you want to use the same component for editing
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
