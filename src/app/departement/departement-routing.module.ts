// my-module-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartementComponent } from './add-departement/add-departement.component';
import { ListDepartementsComponent } from './list-departements/list-departements.component';

const routes: Routes = [
    { path: '', component: ListDepartementsComponent },

      { path: 'add', component: AddDepartementComponent },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartementRoutingModule {}
