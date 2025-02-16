import { RouterModule, Routes } from "@angular/router";
import { ContratListComponent } from "./contrat-list/contrat-list.component";
import { NgModule } from "@angular/core";





const routes: Routes = [


    {path:'', component: ContratListComponent},
   
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ContratRoutingModule { }
  