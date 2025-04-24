import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEquipeComponent } from './list-equipe/list-equipe.component';
import { AddEquipeComponent } from './add-equipe/add-equipe.component';
import { EditEquipeComponent } from './edit-equipe/edit-equipe.component';

const routes: Routes = [
  { path: 'add', component: AddEquipeComponent },
  { path: 'list', component: ListEquipeComponent },
  { path: 'edit/:id', component: EditEquipeComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipeRoutingModule { }