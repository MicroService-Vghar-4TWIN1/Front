import { RouterModule, Routes } from "@angular/router";
import { ContratListComponent } from "./contrat-list/contrat-list.component";
import { NgModule } from "@angular/core";
import { AddContratComponent } from "./add-contrat/add-contrat.component";
import { UpdateContratComponent } from "./update-contrat/update-contrat.component";
import { HistoriqueContratComponent } from "./historique-contrat/historique-contrat.component";





const routes: Routes = [


    {path:'liste', component: ContratListComponent},
    {path:'add', component: AddContratComponent},
    {path:'update/:id', component: UpdateContratComponent},
    {path: 'historique/:id', component: HistoriqueContratComponent },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ContratRoutingModule { }
  