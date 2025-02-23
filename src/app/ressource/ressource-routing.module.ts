import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RessourceListComponent } from './ressource-list/ressource-list.component';

const routes: Routes = [


    {path:'', component: RessourceListComponent},
   
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RessourceRoutingModule { }
