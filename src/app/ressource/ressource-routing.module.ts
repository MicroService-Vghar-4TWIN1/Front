import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RessourceListComponent } from './ressource-list/ressource-list.component';
import { RessourceAddComponent } from './ressource-add/ressource-add.component';
import { RessourceUpdateComponent } from './ressource-update/ressource-update.component';

const routes: Routes = [


    {path:'', component: RessourceListComponent},
    {path:'add', component: RessourceAddComponent},
    {path:'update/:id', component: RessourceUpdateComponent},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RessourceRoutingModule { }
